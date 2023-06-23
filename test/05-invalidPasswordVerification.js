const { By, Builder, until, Key } = require("selenium-webdriver");
const expect = require("chai").expect;

describe("TC_05", function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
  });

  after(async () => await driver.quit());

  it("Verify if user can login using valid login and invalid password", async function () {
    await driver.get("https://semantic-studio.zoovu.com/login");

    let title = await driver.getTitle();
    expect(title).to.equal("Login | Zoovu");

    await driver
      .findElement(By.name("username"))
      .sendKeys("vamibej209@aramask.com");
    await driver.findElement(By.id("login-password")).sendKeys("654321");
    await driver.findElement(By.xpath("//*[@id='login-form']/button")).click();

    await new Promise((resolve) => setTimeout(resolve, 3000));

    title = await driver.getTitle();
    expect(title).to.equal("Login | Zoovu");
  });
});
