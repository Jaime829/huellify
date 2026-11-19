<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirma tu cuenta en Huellify</title>

    <style>
        @import url('https://api.fontshare.com/v2/css?f[]=ranade@400,500,700&display=swap');

        body,
        table,
        td,
        p,
        a,
        h1 {
            font-family: "Ranade", Arial, Helvetica, sans-serif;
        }

        body {
            margin: 0;
            padding: 0;
            background-color: #f4f7f5;
            color: #20352d;
        }

        @media screen and (max-width: 600px) {
            .container {
                width: 100% !important;
            }

            .content {
                padding: 28px 22px !important;
            }

            .heading {
                font-size: 28px !important;
            }

            .description {
                font-size: 15px !important;
            }
        }
    </style>
</head>

<body style="margin:0; padding:0; background-color:#f4f7f5;">

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
        style="background-color:#f4f7f5;">
        <tr>
            <td align="center" style="padding:35px 15px;">

                <table role="presentation" class="container" width="560" cellspacing="0" cellpadding="0"
                    border="0"
                    style="width:100%; max-width:560px; background-color:#ffffff;
                              border:1px solid #e3e9e5; border-radius:16px;">

                    <tr>
                        <td align="center" style="padding:35px 25px 20px;">

                            <img src="{{ asset('images/logo.png') }}" alt="Huellify" width="64"
                                style="display:block; width:64px; max-width:100%;
                                       height:auto; border:0; margin:0 auto 15px;">

                            <p
                                style="margin:0; color:#004e3a; font-size:17px;
                                      line-height:1.5; font-weight:500;">
                                Pequeñas acciones, un planeta mejor.
                            </p>

                        </td>
                    </tr>

                    <tr>
                        <td class="content" style="padding:20px 42px 38px;">

                            <h1 class="heading"
                                style="margin:0 0 18px; color:#163d32;
                                       font-size:32px; line-height:1.25;
                                       font-weight:700;">
                                ¡Bienvenido a Huellify!
                            </h1>

                            <p class="description"
                                style="margin:0 0 25px; color:#52645b;
                                      font-size:16px; line-height:1.8;">
                                Tu cuenta está casi lista. Confirma tu dirección
                                de correo electrónico para comenzar a calcular tu
                                huella de carbono y hacer seguimiento de tu
                                impacto ambiental.
                            </p>

                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td align="center" bgcolor="#004e3a" style="border-radius:8px;">

                                        <a href="{{ $url }}"
                                            style="display:block; padding:16px 20px;
                                                  color:#ffffff; font-size:16px;
                                                  line-height:1.4; font-weight:700;
                                                  text-align:center;
                                                  text-decoration:none;
                                                  background-color:#004e3a;
                                                  border-radius:8px;">
                                            Confirmar mi correo electrónico
                                        </a>

                                    </td>
                                </tr>
                            </table>

                            <p
                                style="margin:22px 0 0; color:#77847d;
                                      font-size:13px; line-height:1.7;">
                                Si el botón no funciona, copia y pega este enlace
                                en tu navegador:
                            </p>

                            <p
                                style="margin:8px 0 0; font-size:12px;
                                      line-height:1.7; overflow-wrap:anywhere;">
                                <a href="{{ $url }}" style="color:#167452; word-break:break-all;">
                                    {{ $url }}
                                </a>
                            </p>
                            <p
                                style="margin:22px 0 0; color:#77847d;
                                      font-size:13px; line-height:1.7;">
                                Este enlace vence en 60 minutos.
                            </p>

                            <p
                                style="margin:24px 0 0; color:#77847d;
                                      font-size:13px; line-height:1.7;">
                                Si no creaste esta cuenta, puedes ignorar
                                este mensaje.
                            </p>

                        </td>
                    </tr>

                    <tr>
                        <td align="center"
                            style="padding:22px 20px; background-color:#f8faf9;
                                   border-top:1px solid #e9eeeb;
                                   border-radius:0 0 16px 16px;">

                            <p
                                style="margin:0; color:#004e3a; font-size:14px;
                                      font-weight:700;">
                                Huellify
                            </p>

                            <p
                                style="margin:7px 0 0; color:#89958e;
                                      font-size:12px; line-height:1.6;">
                                Calcula tu impacto. Mejora tus hábitos.
                            </p>

                            <p
                                style="margin:12px 0 0; color:#a0aaa4;
                                      font-size:11px;">
                                &copy; {{ date('Y') }} Huellify. Todos los derechos reservados.
                            </p>

                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>

</html>
