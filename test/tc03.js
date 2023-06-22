const { By, Builder, until } = require("selenium-webdriver");
const expect = require("chai").expect;

describe("TC_03", function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
  });

  after(async () => await driver.quit());

  xit("Verify if user is remembered after successful login", async function () {
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

    await driver.wait(
      until.elementLocated(
        By.xpath(
          "//*[@id='q-app']/div/div[2]/main/div[1]/div/div[2]/div/div[1]/div"
        )
      )
    );

    const credentials = await driver
      .manage()
      .getCookies()
      .then(function (cookies) {
        console.log("cookie details => ", cookies);
      });
    // await driver
    //   .manage()
    //   .getCookies()
    //   .then(function (cookies) {
    //     allCookies = cookies;
    //     console.log(cookies);
    //   });

    await driver.close();

    driver = await new Builder().forBrowser("chrome").build();

    await driver.manage().deleteAllCookies();
    await driver.manage().addCookie(credentials);
    await driver.get("https://semantic-studio.zoovu.com/login");

    await driver.wait(until.titleContains("Studio"));
    title = await driver.getTitle();
    expect(title).to.equal("Zoovu Search Studio");
  });
});
