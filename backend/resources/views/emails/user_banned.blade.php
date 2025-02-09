<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
        body,
        h3,
        p {
            margin: 0;
            padding: 0;
        }

        .email-container {
            display: grid;
            justify-content: center;
            background-color: #0b0e0f;
            font-family: monospace;
            color: #fff;
            padding: 2em 0;
        }

        .hi {
            margin-top: 6em;
        }

        .email-content {
            margin: auto;
            width: 368px;
            border-radius: 5px;
            background-color: #191b1f;
        }

        .email-header {
            display: grid;
            align-content: end !important;
            width: 100%;
            max-width: 346px;
            height: 228px;
            background-image: url("https://media.discordapp.net/attachments/1141220004910600345/1308256829419163709/8d955dacb77334525a7d5388f6b2f6c0.png?ex=673d489e&is=673bf71e&hm=884309649a9fe0b3bf3a784c2eac94ab4b4e7a6ce6129d5b946b9cdbf0f615b5&=&format=webp&quality=lossless&width=297&height=312");
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            padding: 10px;
            font-size: 30px;
            font-weight: 600;
            border-radius: 5px 5px 0 0;
        }

        .user-content {}

        .user-info {
            padding: 10px;
        }

        .user-info h4 {
            margin-bottom: 6px;
            font-size: 16px;
            font-weight: 700;
            color: #fff;
            margin: 0 0 10px 0;
        }

        .user-info p {
            font-size: 12px;
            color: #b1bcc3;
        }

        .creator-info {
            display: grid;
            place-items: center !important;
            margin-bottom: 2em;
        }

        .creator-info img {
            width: 64px;
            height: 64px;
            border-radius: 50%;
            object-fit: cover;
            object-position: center;
            margin: auto;
        }

        .username-creator {
            font-weight: bold;
            font-size: 14px;
            margin: 4px auto;
        }

        .tag {
            background: #070809;
            border-radius: 27.5px;
            padding: 4px 8px;
            font-size: 10px;
            color: #768087;
            font-weight: 700;
            margin: auto;
        }

        .container-btn {
            display: grid;
        }

        .btn {
            text-align: center;
            display: block;
            background-color: #877eff;
            color: #fff !important;
            border-radius: 4px;
            border: 0;
            flex: 1;
            text-decoration: none;
            font-weight: 600;
            font-size: 14px;
            padding: 6px 8px;
            box-sizing: border-box;
            margin: 1em;
            cursor: pointer;
        }
    </style>
    <title>BANNED</title>
</head>

<body>
    <div class="email-container">
        <div class="email-content">
            <div class="email-header">
                <p class="hi">Hola</p>
            </div>
            <div class="user-content">
                <div class="user-info">
                    <h4>Hey {{ $user->name }},</h4>
                    <p>
                        Lamentamos informarte que tu cuenta en nuestra plataforma ha sido baneada.
                        Si crees que esto es un error o deseas apelar esta decisión, por favor contacta a nuestro equipo
                        de soporte.
                    </p>
                    <p>Gracias,</p>
                    <p>El equipo de soporte</p>
                </div>
                <div class="creator-info">
                    {{-- <img src="http://127.0.0.1:8000/storage/{{$data['usuarioPost']->avatar}}" alt=""> --}}
                    <img class="img"
                        src="https://media.discordapp.net/attachments/1141220004910600345/1308258453608857621/ban-from-website.png?ex=673d4a21&is=673bf8a1&hm=700905bbb9abc1f09a7aa5210ad63e12cc658402f875616f63ea403a68b32f00&=&format=webp&quality=lossless&width=937&height=593"
                        alt="Placeholder">
                    <p class="username-creator">{{ $user->username }}</p>
                    <p class="tag">BANNED</p>
                </div>
                <div class="container-btn">
                    <a class="btn" target="_blank" rel="noopener noreferrer">Contactanos</a>
                </div>
            </div>
        </div>
    </div>
</body>

</html>

{{-- <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cuenta Baneada</title>
</head>
<body>
    <h1>Hola, {{ $user->name }}</h1>

    <p>Lamentamos informarte que tu cuenta en nuestra plataforma ha sido baneada.</p>

    <p>Si crees que esto es un error o deseas apelar esta decisión, por favor contacta a nuestro equipo de soporte.</p>

    <p>Gracias,</p>
    <p>El equipo de soporte</p>
</body>
</html> --}}
