<?php
// Check if form was submitted via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect and sanitize form inputs
    $name    = htmlspecialchars(trim($_POST["name"]));
    $email   = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $phone   = htmlspecialchars(trim($_POST["phone"]));
    $message = htmlspecialchars(trim($_POST["message"]));

    // Email configuration
    $to      = "kevinfadel15@gmail.com";
    $subject = "New Inquiry from Legal Lab Website";
    
    // Construct the email body
    $body  = "You have received a new inquiry from the Legal Lab website:\n\n";
    $body .= "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Phone: $phone\n\n";
    $body .= "Message:\n$message\n";

    // Email headers
    $headers  = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Send the email
    if (mail($to, $subject, $body, $headers)) {
        // Redirect to thank you page if successful
        header("Location: thankyouContact.html");
        exit();
    } else {
        // Error message if email fails
        echo "Sorry, your message could not be sent. Please try again later.";
    }
} else {
    // If accessed without POST
    echo "Invalid request method.";
}
?>
