const { By, Builder, until, Key } = require("selenium-webdriver");
const expect = require("chai").expect;

describe("TC_06", function () {
  let driver;
  const credentials = [
    { login: "admin@zoovu.com", password: "123456" },
    { login: "admin@zoovu.com", password: "admin" },
    { login: "admin@zoovu.com", password: "admin123" },
    { login: "example@example.com", password: "123456" },
    { login: "example@example.com", password: "qwerty" },
  ];

  credentials.forEach(({ login, password }) => {
    it(`Verify if user can login using ${login} login and ${password} password`, async function () {
      driver = await new Builder().forBrowser("chrome").build();
      await driver.get("https://semantic-studio.zoovu.com/login");

      let title = await driver.getTitle();
      expect(title).to.equal("Login | Zoovu");

      await driver.findElement(By.name("username")).sendKeys(login);
      await driver.findElement(By.id("login-password")).sendKeys(password);
      await driver
        .findElement(By.xpath("//*[@id='login-form']/button"))
        .click();

      await new Promise((resolve) => setTimeout(resolve, 3000));

      title = await driver.getTitle();
      expect(title).to.equal("Login | Zoovu");

      await driver.quit();
    });
  });
});
