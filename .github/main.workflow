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

action "Snapshot UI" {
  uses = "./workflows/action-puppeteer/"
  needs = ["Test"]
  args = "snapshot-ui"
  secrets = ["PERCY_TOKEN"]
}

action "End to End" {
  uses = "./workflows/action-puppeteer/"
  needs = ["Test"]
  args = "e2e"
}

action "Deploy" {
  uses = "./workflows/action-puppeteer/"
  needs = ["End to End", "Snapshot UI"]
  args = "deploy"
  secrets = ["NOW_TOKEN"]
}
