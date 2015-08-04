<?php

$email = "callback@lawdecision.com";
$subject = "Перезвоните мне";

if ( isset($_POST["contact-phone"]) ) {

	$to = $email;
	$subject = $subject;
	$message = $_POST["contact-phone"];
	$headers = "From: Law-Decision";
	mail( $to, $subject, $message, $headers );	
	echo "Success";

} else {
	
	echo "POST request does not contain necessary data!";
	
}