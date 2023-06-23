const { By, Builder, until } = require("selenium-webdriver");
const expect = require("chai").expect;

describe("TC_02", function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    await driver
      .manage()
      .window()
      .setRect({ x: 0, y: 0, width: 380, height: 800 });
  });

  after(async () => await driver.quit());

  it("Verify if user can login using valid login and valid password using mobile device", async function () {
    await driver.get("https://semantic-studio.zoovu.com/login");

    let title = await driver.getTitle();
    expect(title).to.equal("Login | Zoovu");

    await driver
      .findElement(By.name("username"))
      .sendKeys("vamibej309@aramask.com");
    await driver.findElement(By.id("login-password")).sendKeys("123456");
    await driver.findElement(By.xpath("//*[@id='login-form']/button")).click();

    await driver.wait(until.titleContains("Studio"));
    title = await driver.getTitle();
    expect(title).to.equal("Zoovu Search Studio");
  });
});
