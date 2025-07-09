<?php
// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $name = trim($_POST["name"]);
    $email = trim($_POST["email"]);
    $subject = trim($_POST["subject"]);
    $message = trim($_POST["message"]);

    // Validate form data
    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        // If any field is empty, display an error message
        echo "Please fill in all fields.";
    } else {
        // If all fields are filled, proceed with sending the email
        $to = "your_email@example.com"; // Enter your email address here
        $subject = "Contact Form Submission: $subject";
        $body = "Name: $name\nEmail: $email\n\n$message";

        // Send the email
        if (mail($to, $subject, $body)) {
            // If email is sent successfully, display a success message
            echo "Your message has been sent successfully!";
        } else {
            // If there was an error sending the email, display an error message
            echo "Oops! Something went wrong. Please try again later.";
        }
    }
} else {
    // If the form is not submitted via POST method, display an error message
    echo "Access denied!";
}
?>
