open GraphqlFuture;

let storyTypeLazy =
  lazy
    Schema.(
      obj("story", ~fields=_ =>
        [
          field(
            "id",
            nonnull(int),
            ~args=[],
            ~resolve=(_ctx, story: StoryData.story) =>
            story.id
          ),
          field(
            "title",
            nonnull(string),
            ~args=[],
            ~resolve=(_ctx, story: StoryData.story) =>
            story.title
          ),
        ]
      )
    );

let storyType = Lazy.force(storyTypeLazy);

let handleJsPromiseError = Js.String.make;

let query =
  Schema.(
    query([
      async_field(
        "story",
        storyType,
        ~args=Arg.[arg("id", nonnull(int))],
        ~resolve=(_ctx, (), id) =>
        StoryData.getStory(id)
        ->FutureJs.fromPromise(handleJsPromiseError)
        ->Future.mapOk(result => Some(result))
      ),
      async_field(
        "topStories",
        list(nonnull(storyType)),
        ~args=Arg.[arg("page", nonnull(int))],
        ~resolve=(_ctx, (), page) =>
        StoryData.getTopStories(page)
        ->FutureJs.fromPromise(handleJsPromiseError)
        ->Future.mapOk(result => Some(Belt.List.fromArray(result)))
      ),
    ])
  );

let schema: Schema.schema(unit) = Schema.create(query);
