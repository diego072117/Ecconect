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

        .hi{
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
            background-image: url("https://media.discordapp.net/attachments/1141220004910600345/1308232529769271358/73d27bcbb7070bea2b263c3ac8b7c147.png?ex=674efe3c&is=674dacbc&hm=0ce1a9afdc76b303ee46376dc739ebec6b7c37daacf8c3f836ba9190b78bc26c&=&format=webp&quality=lossless&width=395&height=593");
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
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
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
    <title>Calificación Pendiente</title>
</head>

<body>
    <div class="email-container">
        <div class="email-content">
            <div class="email-header"><p class="hi">Hola</p></div>
            <div class="user-content">
                <div class="user-info">
                    <h4>Hey {{ $data['usuarioDonado']->username }},</h4>
                    <p>
                        Califica a {{ $data['usuarioPost']->name }} Ahora! Click en el boton para ir a calificar
                    </p>
                </div>
                <div class="creator-info">
                    {{-- <img src="http://127.0.0.1:8000/storage/{{$data['usuarioPost']->avatar}}" alt=""> --}}
                    <img class="img" src="https://media.discordapp.net/attachments/1141220004910600345/1308234553076219976/profile-placeholder.jpg?ex=674f001f&is=674dae9f&hm=2a8191debc2287c45e93f0719192a5aaaa4414ff97b3bddfa9a9a11e2a885273&=&format=webp&width=67&height=67" alt="Placeholder">
                    <p class="username-creator">{{ $data['usuarioPost']->username }}</p>
                    <p class="tag">creador</p>
                </div>
                <div class="container-btn">
                    <a href="http://localhost:5173/ratings" class="btn" target="_blank" rel="noopener noreferrer">Calificar
                        ahora</a>
                </div>
            </div>
        </div>
    </div>
</body>

</html>


