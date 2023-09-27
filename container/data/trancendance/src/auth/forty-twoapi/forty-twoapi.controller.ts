import { Controller, Get, Redirect, Query, Res, Req, UseGuards } from '@nestjs/common';
import { FortyTwoApiService } from './forty-twoapi.service';
import { ForbiddenException } from '@nestjs/common';

@Controller('42')
export class FortyTwoApiController extends FortyTwoApiService  {
    
    //@UseGuards()
    @Get('login')
    @Redirect('http://localhost:3000/42/redirect')
    handleLogin() { 
      return {url : process.env.REDIRECT_URL};
    }
    
    @Get('redirect')
    async handleRedirect(@Req() req, @Res() res) {
        const code = req.query.code;
        //console.log("code: " + code);
        try {
            const token = await this.getTokenFortyTwoUser(code).toPromise();
            //console.log("token: " + token);
            res.cookie('token', token);
            // Redirigez vers la page d'accueil de notre site 
            res.redirect('http://localhost:3000');
        } catch (error) {
            // Gérez les erreurs ici
            console.error('Erreur lors de l\'obtention de l\'access_token:', error);
            // Redirigez vers une page d'erreur ou effectuez une autre action appropriée en cas d'erreur.
        }
    }

    @Get('test')
    async handleTest(@Req() req, @Res() res) {
        const accessToken = req.cookies.token; // Récupérez l'access_token de manière sécurisée depuis les cookies
     //   console.log("ICI token ", accessToken);
        if (!accessToken) {
            // Gérez le cas où l'access_token n'est pas présent ou expiré
            return { error: 'Access Token non valide' };
        }
        // Effectuez une requête GET à l'API 42 pour obtenir les informations de l'utilisateur
        try {
            //console.log("Token cookie: ", accessToken);
            const response = await this.getInformationUser(accessToken, req, res).toPromise();
         //   console.log(response);
           // console.log(response.data.id , response.data.login);
            if (response.data && response.data.id && response.data.login) {
                const responseData = response.data;
                const id = responseData.id;
                const username = responseData.login;
                // console.log(response + id + username);
                const jwt_token = await this.signToken({ 
                    id: id, 
                    username: username
                    });
                    // console.log("HELLLOOOOOOOOOOOOOOO");
                    if (!jwt_token) {
                  //     console.log("IcI iCI");
                       throw new ForbiddenException();
                   }
               // Ici on rajoute l A2F
              // console.log("JWT TOKEN " + jwt_token);
               res.cookie('jwt_token', jwt_token);
                //  res.cookie('jwt_token', jwt_token, {
                //    domain: 'localhost:3000',
                //    path: '/',
                //    maxAge: 3600000, // Durée de vie en millisecondes
                //   httpOnly: true, // Le cookie est accessible uniquement par le serveur
                //   secure: true, // Utilisez uniquement pour HTTPS
                //   sameSite: 'strict', // Options de sécurité pour les cookies
                //  });
                


                // approche valide pour s'assurer que la réponse HTTP est correctement envoyée au client. SI TU FAIS PAS PLUS DE JWT
                res.send({message: 'Logged '});
                await this.postGeneratetwoAuthentification(id).toPromise();
              } else {
                console.error('La structure de la réponse JSON de l\'API 42 est incorrecte.');
              }

            
         //   console.log(response);
           
            return res;
        } catch (error) {
            console.error('Erreur lors de la requête GET vers l\'API 42:', error);
            return { error: 'Erreur lors de la récupération des informations de l\'utilisateur' };
        }
        console.log("FIN");
    }
}
