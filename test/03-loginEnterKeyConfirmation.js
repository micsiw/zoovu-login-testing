const { By, Builder, until, Key } = require("selenium-webdriver");
const expect = require("chai").expect;

describe("TC_03", function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
  });

  after(async () => await driver.quit());

  it("Verify if user can confirm login credentials by pressing enter key", async function () {
    await driver.get("https://semantic-studio.zoovu.com/login");

    let title = await driver.getTitle();
    expect(title).to.equal("Login | Zoovu");

    await driver
      .findElement(By.name("username"))
      .sendKeys("vamibej309@aramask.com");
    await driver
      .findElement(By.id("login-password"))
      .sendKeys("123456", Key.RETURN);

    await driver.wait(until.titleContains("Studio"));
    title = await driver.getTitle();
    expect(title).to.equal("Zoovu Search Studio");
  });
});
