<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>¡Bienvenido a Huellify!</title>

    <!--[if mso]>
    <style type="text/css">
        body, table, td, p, a, h1 { font-family: Arial, sans-serif !important; }
    </style>
    <![endif]-->

    <style>
        @import url('https://fontshare.com[]=ranade@400,500,700&display=swap');

        body,
        table,
        td,
        p,
        a,
        h1 {
            font-family: "Ranade", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
        }

        body {
            margin: 0;
            padding: 0;
            width: 100% !important;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            background-color: #f4f7f5;
            color: #20352d;
        }

        table,
        td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }

        img {
            -ms-interpolation-mode: bicubic;
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }

        /* Responsive */
        @media screen and (max-width: 600px) {
            .container {
                width: 100% !important;
                max-width: 100% !important;
            }

            .content {
                padding: 30px 24px !important;
            }

            .heading {
                font-size: 26px !important;
                line-height: 1.3 !important;
            }

            .description {
                font-size: 15px !important;
            }

            .btn-wrapper {
                width: 100% !important;
                display: block !important;
            }

            .btn {
                display: block !important;
                padding: 14px 10px !important;
            }
        }
    </style>
</head>

<body style="margin:0; padding:0; background-color:#f4f7f5; width:100% !important;">

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
        style="background-color:#f4f7f5;">
        <tr>
            <td align="center" style="padding:40px 12px;">

                <table role="presentation" class="container" width="560" cellspacing="0" cellpadding="0"
                    border="0"
                    style="width:100%; max-width:560px; background-color:#ffffff; border:1px solid #e3e9e5; border-radius:16px; overflow:hidden;">
                    <tr>
                        <td align="center" style="padding:40px 40px 20px;">
                            <img loading="lazy" src="{{ asset('images/logo.webp') }}" alt="Huellify" width="64" height="64"
                                style="display:block; width:64px; height:64px; margin:0 auto 16px;">

                            <p
                                style="margin:0; color:#004e3a; font-size:16px; line-height:1.5; font-weight:500; letter-spacing: 0.2px;">
                                Pequeñas acciones, un planeta mejor.
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td class="content" style="padding:20px 48px 40px; text-align: center;">

                            <h1 class="heading"
                                style="margin:0 0 16px; color:#163d32; font-size:30px; line-height:1.25; font-weight:700;">
                                ¡Cuenta confirmada con éxito!
                            </h1>

                            <p class="description"
                                style="margin:0 0 32px; color:#52645b; font-size:16px; line-height:1.6;">
                                Hola {{ $name }}, tu cuenta ha sido verificada correctamente. Ya tienes acceso
                                completo a todas las herramientas de <strong>Huellify</strong>. Es hora de empezar a calcular tu
                                impacto, mejorar tus hábitos cotidianos y cambiar el mundo.
                            </p>

                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center"
                                class="btn-wrapper">
                                <tr>
                                    <td align="center" bgcolor="#004e3a" style="border-radius: 12px;">
                                        <a href="{{ route('dashboard.index') }}" target="_blank" class="btn"
                                            style="font-size: 15px; font-weight: 700; color: #ffffff; text-decoration: none; padding: 14px 32px; display: inline-block; border-radius: 12px; background-color: #004e3a; border: 1px solid #004e3a;">
                                            Ir al Dashboard
                                        </a>
                                    </td>
                                </tr>
                            </table>

                        </td>
                    </tr>
                    <tr>
                        <td align="center"
                            style="padding:28px 24px; background-color:#f8faf9; border-top:1px solid #e9eeeb;">

                            <p style="margin:0; color:#004e3a; font-size:14px; font-weight:700; letter-spacing: 0.5px;">
                                Huellify
                            </p>

                            <p style="margin:6px 0 0; color:#89958e; font-size:12px; line-height:1.6;">
                                Calcula tu impacto. Mejora tus hábitos.
                            </p>

                            <p style="margin:16px 0 0; color:#a0aaa4; font-size:11px; letter-spacing: 0.2px;">
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
