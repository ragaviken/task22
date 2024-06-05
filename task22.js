import org.openqa.selenium.By;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import javax.imageio.ImageIO;
import java.io.File;
import java.io.IOException;

public class FormAutomation {
    public static void main(String[] args) {
        // Set the path to the ChromeDriver executable
        System.setProperty("webdriver.chrome.driver", "path/to/chromedriver");

        // Initialize the ChromeDriver
        WebDriver driver = new ChromeDriver();

        try {
            // Open the form page
            driver.get("https://phptravels.com/demo/");

            // Initialize WebDriverWait
            WebDriverWait wait = new WebDriverWait(driver, 10);

            // Fill in the form details
            WebElement firstName = wait.until(ExpectedConditions.visibilityOfElementLocated(By.name("first_name")));
            firstName.sendKeys("John");

            WebElement lastName = driver.findElement(By.name("last_name"));
            lastName.sendKeys("Doe");

            WebElement businessName = driver.findElement(By.name("business_name"));
            businessName.sendKeys("JD Travels");

            WebElement email = driver.findElement(By.name("email"));
            email.sendKeys("johndoe@example.com");

            // Verify the sum
            WebElement sum1 = driver.findElement(By.id("number1"));
            WebElement sum2 = driver.findElement(By.id("number2"));
            int num1 = Integer.parseInt(sum1.getText());
            int num2 = Integer.parseInt(sum2.getText());
            int sum = num1 + num2;

            WebElement sumInput = driver.findElement(By.id("number"));
            sumInput.sendKeys(String.valueOf(sum));

            // Submit the form
            WebElement submitButton = driver.findElement(By.id("demo"));
            submitButton.click();

            // Wait for the success message to appear
            WebElement successMessage = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//h2[contains(text(), 'Thank you!')]")));

            // Check if the success message is displayed
            if (successMessage.isDisplayed()) {
                System.out.println("Form submitted successfully!");

                // Take a screenshot of the page
                File screenshot = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
                File destinationFile = new File("form_submission_success.png");
                ImageIO.write(ImageIO.read(screenshot), "png", destinationFile);
                System.out.println("Screenshot taken: " + destinationFile.getAbsolutePath());
            } else {
                System.out.println("Form submission failed!");
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // Close the driver
            driver.quit();
        }
    }
}
