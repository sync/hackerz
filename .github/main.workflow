workflow "Build, Test, and Publish" {
  on = "push"
  resolves = [
    "Install",
    "Test",
    "End to End",
    "Deploy"
  ]
}

action "Install" {
  uses = "./workflows/action-puppeteer/"
  args = "install"
}

action "Test" {
  uses = "./workflows/action-puppeteer/"
  needs = ["Install"]
  args = "ci"
}

action "End to End" {
  uses = "./workflows/action-puppeteer/"
  needs = ["Test"]
  args = "e2e"
}

action "Deploy" {
  uses = "./workflows/action-puppeteer/"
  needs = ["End to End"]
  args = "ci:deploy"
  secrets = ["NOW_TOKEN"]
}
