export interface EmailTemplate {
  id: string;
  name: string; // For display in the dropdown
  subject: string; // Pre-fills the email subject
  content: string; // The full HTML content of the email
}

export const emailTemplatesList: EmailTemplate[] = [
  {
    id: 'orientation-session-v1',
    name: 'Orientation Session Template',
    subject: 'Your Aanandham Yoga Journey Begins!',
    content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Yoga Journey Begins!</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background-color: #fdf8f6; /* Very light, warm off-white */
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        .email-container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 16px; /* Rounded corners */
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
            overflow: hidden;
        }
        .header {
            background-color: #e8dcd9; /* Light, muted beige-pink */
            padding: 32px 24px;
            text-align: center;
            border-top-left-radius: 16px;
            border-top-right-radius: 16px;
        }
        .content {
            padding: 32px 24px;
            color: #374151; /* Darker gray for text */
            line-height: 1.6;
        }
        .button {
            display: inline-block;
            background-color: #8B4513; /* Saddle Brown */
            color: #ffffff;
            padding: 12px 24px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            transition: background-color 0.3s ease;
        }
        .button:hover {
            background-color: #6F360F; /* Darker Saddle Brown on hover */
        }
        .footer {
            background-color: #fdf8f6; /* Very light, warm off-white footer */
            padding: 24px;
            text-align: center;
            color: #6b7280; /* Gray text */
            font-size: 0.875rem;
            border-bottom-left-radius: 16px;
            border-bottom-right-radius: 16px;
        }
        .zoom-details p {
            margin-bottom: 8px;
        }
        .zoom-details strong {
            color: #8B4513; /* Saddle Brown for important details */
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1 class="text-3xl font-bold text-gray-800 mb-2">Namastey! {{name}}</h1>
            <p class="text-lg text-gray-600">Your Yoga Journey Awaits</p>
        </div>

        <div class="content">
            <p class="mb-6 text-center italic text-gray-600">"Success occurs when opportunity meets preparation"</p>

            <p class="mb-6">Thank you for your interest in your Yoga journey. Please find your login details to join your 21-day preparation call.</p>

            <h2 class="text-xl font-semibold text-gray-800 mb-4">Orientation Session Details:</h2>

            <div class="zoom-details bg-gray-50 p-6 rounded-lg mb-6 border border-gray-200" style="background-color: #fefaf7; border-color: #f0e9e5;">
                <p><strong>Date:</strong> Tomorrow, May 31, 2025</p>
                <p><strong>Time:</strong> 06:00 AM London / 10:30 AM India time</p>
                <p><strong>Duration:</strong> 45 minutes session to get you prepared and set up for the 21 days celebrations!</p>
                <p class="mt-4">
                    <strong>Zoom Meeting Link:</strong><br>
                    <a href="https://us02web.zoom.us/j/89592774012?pwd=dvO3tmny1JqbGS40vRw2Npk8Dbnhnd.1" class="text-blue-600 hover:underline break-all">https://us02web.zoom.us/j/89592774012?pwd=dvO3tmny1JqbqbGS40vRw2Npk8Dbnhnd.1</a>
                </p>
                <p><strong>Meeting ID:</strong> 895 9277 4012</p>
                <p><strong>Passcode:</strong> yoga</p>
            </div>

            <p class="mb-6">Come with an open mind and full of enthusiasm.</p>
            <p class="mb-6">Looking forward to meeting you online tomorrow. Have a notepad and pen ready!</p>

            <p class="mb-6 text-center">
                <a href="https://whatsapp.com/channel/0029Vb6TVmMIHphOpcRGS03y" class="button">
                    Follow the Aanandham channel on WhatsApp
                </a>
            </p>
            <p class="mt-6 text-center">
                <img src="https://iili.io/F9CSecb.jpg" alt="Yoga illustration" class="mx-auto rounded-lg shadow-md" style="max-width: 100%; height: auto;">
            </p>
        </div>

        <div class="footer">
            <p>With love and joy</p>
            <p class="font-semibold text-gray-700">Aanandham team :)</p>
        </div>
    </div>
</body>
</html>`
  },
  {
    id: 'post-orientation-followup-v1',
    name: 'Post-Orientation Session Follow-up',
    subject: `Thank You for Joining Today's Yoga Orientation – Recording Inside`,
    content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You for Joining Today's Yoga Orientation – Recording Inside</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background-color: #fdf8f6; /* Very light, warm off-white */
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        .email-container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 16px; /* Rounded corners */
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
            overflow: hidden;
        }
        .header {
            background-color: #e8dcd9; /* Light, muted beige-pink */
            padding: 32px 24px;
            text-align: center;
            border-top-left-radius: 16px;
            border-top-right-radius: 16px;
        }
        .content {
            padding: 32px 24px;
            color: #374151; /* Darker gray for text */
            line-height: 1.6;
        }
        .button {
            display: inline-block;
            background-color: #8B4513; /* Saddle Brown */
            color: #ffffff;
            padding: 12px 24px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            transition: background-color 0.3s ease;
        }
        .button:hover {
            background-color: #6F360F; /* Darker Saddle Brown on hover */
        }
        .footer {
            background-color: #fdf8f6; /* Very light, warm off-white footer */
            padding: 24px;
            text-align: center;
            color: #6b7280; /* Gray text */
            font-size: 0.875rem;
            border-bottom-left-radius: 16px;
            border-bottom-right-radius: 16px;
        }
        .section-title {
            color: #8B4513; /* Saddle Brown for important details */
            font-weight: 600;
            margin-bottom: 12px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1 class="text-3xl font-bold text-gray-800 mb-2">Thank You for Joining!</h1>
            <p class="text-lg text-gray-600">Your Yoga Journey Continues</p>
        </div>

        <div class="content">
            <p class="mb-6">Dear {{name}},</p>

            <p class="mb-6">Thank you for joining today's orientation session for the 21-Day Yoga Journey! It was a pleasure to have you with us as we laid the foundation for the next three weeks of exercise, yoga, and building healthy habits through mindful movement, breath, and self-discovery.</p>

            <h2 class="text-xl font-semibold text-gray-800 mb-4 section-title">Session Recording:</h2>
            <p class="mb-6">If you missed the session or would like to watch it again, you can access the recording here:</p>
            <p class="mb-6 text-center">
                <a href="https://www.youtube.com/watch?v=hWUx4ZPihqM" class="button">
                    👉 Watch Recording
                </a>
            </p>

            <h2 class="text-xl font-semibold text-gray-800 mb-4 section-title">Healthy Habit for Today:</h2>
            <div class="bg-gray-50 p-6 rounded-lg mb-6 border border-gray-200" style="background-color: #fefaf7; border-color: #f0e9e5;">
                <p class="font-semibold mb-2">Maintaining a daily journal!</p>
                <p>Journaling helps you to develop self-discipline & focus on your goals and stay motivated by measuring your progress.</p>
                <p class="mt-2">You can start by simply taking 2 minutes to note down what activities you did and what went well and what didn't without any judgment and observe changes in your body, mind, and soul level as it is.</p>
            </div>

            <p class="mb-6">Look forward to your email for tomorrow with the practice link.</p>
            <p class="mb-6 text-center text-gray-600 text-sm">
                <strong>Note:</strong> You'll receive the new practice link every day in your email.
            </p>

            <h2 class="text-xl font-semibold text-gray-800 mb-4 section-title">Stay Connected:</h2>
            <p class="mb-4 text-center">
                <a href="https://whatsapp.com/channel/0029Vb6TVmMIHphOpcRGS03y" class="button">
                    Follow the Aanandham channel on WhatsApp
                </a>
            </p>
            <p class="mb-6 text-center">
                <a href="https://www.youtube.com/watch?v=hWUx4ZPihqM" class="button">
                    Subscribe to Aanandham YouTube Channel
                </a>
            </p>
        </div>

        <div class="footer">
            <p>With love and joy,</p>
            <p class="font-semibold text-gray-700">Aanandham team :)</p>
        </div>
    </div>
</body>
</html>`
  }
  // Future templates can be added here
]; 