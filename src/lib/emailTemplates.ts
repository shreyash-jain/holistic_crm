export interface EmailTemplate {
  id: string;
  name: string; // For display in the dropdown
  subject: string; // Pre-fills the email subject
  content: string; // The full HTML content of the email
  
}

export const emailTemplatesList: EmailTemplate[] = [
  {
    id: 'daily-yoga-practice-v1',
    name: 'Daily Yoga Practice Template',
    subject: `Aanandham - Your Daily Yoga Practice - Day {{day_number}}`,
    content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aanandham - Your Daily Yoga Practice</title>
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
            <h1 class="text-3xl font-bold text-gray-800 mb-2">Welcome to Day {{day_number}}!</h1>
            <p class="text-lg text-gray-600">Your 21-Day Yoga Journey Continues</p>
        </div>

        <div class="content">
            <p class="mb-6">Dear {{name}},</p>

            <h2 class="text-xl font-semibold text-gray-800 mb-4 section-title">Today's Practice Link:</h2>
            <p class="mb-6 text-center">
                <a href="{{join_link}}" class="button">
                    👉 Click to join Today's Session
                </a>
            </p>

            <h2 class="text-xl font-semibold text-gray-800 mb-4 section-title">Quote for Today:</h2>
            <p class="mb-6 text-center italic text-gray-600">"{{morning_quote}}"</p>

            <h2 class="text-xl font-semibold text-gray-800 mb-4 section-title">Healthy Habit for Today:</h2>
            <div class="bg-gray-50 p-6 rounded-lg mb-6 border border-gray-200" style="background-color: #fefaf7; border-color: #f0e9e5;">
                <p class="font-semibold mb-2">{{daily_habit_heading}}</p>
                <p>{{daily_habit_text}}</p>
            </div>

            <h2 class="text-xl font-semibold text-gray-800 mb-4 section-title">What's Next:</h2>
            <p class="mb-6">{{what_next}}</p>

            <h2 class="text-xl font-semibold text-gray-800 mb-4 section-title">Stay Connected:</h2>
            <p class="mb-4 text-center">
                <a href="https://whatsapp.com/channel/0029Vb6TVmMIHphOpcRGS03y" class="button">
                    To be connected on whatsapp - click here
                </a>
            </p>
            <p class="mb-6 text-center">
                <a href="https://youtube.com/@aanandhamuk?sub_confirmation=1 " class="button">
                    To stay connected with upcoming youtube videos - click here
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
  },
  // New Template
  {
    id: 'evening-yoga-reminder-v1',
    name: 'Evening Yoga Reminder Template',
    subject: `Gentle Reminder: Your Yoga Practice for Day {{day_number}}`,
    content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aanandham - Your Evening Yoga Reminder</title>
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
            <h1 class="text-3xl font-bold text-gray-800 mb-2">Gentle Reminder!</h1>
            <p class="text-lg text-gray-600">Welcome to Day {{day_number}}!</p>
            <p class="text-lg text-gray-600">Your Daily Yoga Practice Awaits</p>
        </div>

        <div class="content">
            <p class="mb-6">Dear {{name}},</p>

            <p class="mb-6 text-center text-gray-600">
                {{custom_message_text}}
                <br><br>
                If you missed the morning session, you can still practice in the evening with this link below.
            </p>

            <h2 class="text-xl font-semibold text-gray-800 mb-4 section-title">Today's Practice Session:</h2>
            <p class="mb-6 text-center">
                <a href="{{join_link}}" class="button">
                    Click here to join today's session
                </a>
            </p>

            <p class="mb-6 text-center text-gray-600">
                {{what_next}}
            </p>

            <h2 class="text-xl font-semibold text-gray-800 mb-4 section-title">Stay Connected:</h2>
            <p class="mb-4 text-center">
                <a href="https://whatsapp.com/channel/0029Vb6TVmMIHphOpcRGS03y" class="button">
                    To be connected on whatsapp - click here
                </a>
            </p>
            <p class="mb-6 text-center">
                <a href="https://youtube.com/@aanandhamuk?sub_confirmation=1 " class="button">
                    To stay connected with upcoming youtube videos - click here
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