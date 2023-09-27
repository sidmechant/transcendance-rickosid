import { Injectable, NotFoundException} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service'; // Assurez-vous que le chemin d'accès est correct
import { User } from '@prisma/client'; // Importez le type User depuis les modules Prisma

@Injectable()
export class CrudService extends PrismaService {
  constructor(private readonly prisma: PrismaService) {
    super();
  }


  async createUser(userObj: any): Promise<User> {
    try {
      let userItem = await this.prisma.user.findUnique({
        where: {
          username: userObj.username,
        },
      });
      if (userItem) {
        return userItem;
      }
  
      this.prisma.$transaction(async (prisma) => {
        userItem = await prisma.user.create({
          data: {
            id: userObj.id,
            createdAt: new Date(),
            updatedAt: new Date(),
            username: userObj.username,
            displayname: userObj.displayname,
            lastname: userObj.lastname,
            firstname: userObj.firstname,
            profileurl: userObj.profileurl,
            emails: userObj.emails,
            phoneNumbers: userObj.phoneNumbers,
            photourl: userObj.photourl,
            player: {
              create: {
                id: userObj.id, // Utilisez le même ID que l'utilisateur
                // autres champs du joueur
                pseudo: userObj.username, // Add the pseudo property
                urlPhotoProfile: userObj.photourl, 
              },
            },
          },
          include: {
            player: true,
          },
        });
      });
  
      if (!userItem) {
        throw new Error("Erreur lors de la création de l'utilisateur");
      }
  
      return userItem;
    } catch (error) {
    console.log("ICI HE HOOOO");
      console.log("Error CRUD: ", error);
      throw error;
    }
  }
  
/*  async createUser(userObj: any): Promise<User> {
    try {
      let userItem = await this.prisma.user.findUnique({
        where: {
          username: userObj.username,
        },
      });
      if(userItem){
        return userItem;
      }
      if (!userItem) {
        userItem = await this.prisma.user.create({
          data: {
            id: userObj.id, // Laissez cette ligne telle quelle, Prisma générera automatiquement l'ID
            createdAt: new Date(), // Utilisez la date et l'heure actuelles
            updatedAt: new Date(), // Utilisez la date et l'heure actuelles   
            username: userObj.username,
            displayname: userObj.displayname,
            lastname: userObj.lastname,
            firstname: userObj.firstname,
            profileurl: userObj.profileurl,
            emails: userObj.emails,
            phoneNumbers: userObj.phoneNumbers,
            photourl: userObj.photourl,
          },
        });
      }

      if (!userItem) {
        throw new Error('Erreur lors de la création de l\'utilisateur');
      }

      return userItem;
    } catch (error) {
      console.log("Error CRUD: ", error);
      throw error; // Lancez une exception en cas d'erreur
    }
  }*/

  // Autres méthodes pour effectuer des opérations CRUD
  async findUserById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }                                                                                                                                                                                                                                      

  async updateUserAuthenticationSecret(id: number, secret: string) {
    await this.prisma.user.update({
      where: { id: id },
      data: { twoFactorAuthenticationSecret: secret },
    });
  }

  async updateUserAuthenticationEnabled(id : number, value: boolean) {
    await this.prisma.user.update({
      where: {id: id},
      data: { isTwoFactorAuthenticationEnabled: value}
    });
  }

  async getTwoFactorAuthenticationSecret(id: number) {  
    const user = await this.findUserById(id);
    if (!user)
      throw new NotFoundException("Error getTwoFactorAuthenticationSecret");
    return user.twoFactorAuthenticationSecret;
  }

  async updateTwoFactorAuthenticationSecret(id: number, newSecret : string) {  
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: { twoFactorAuthenticationSecret: newSecret },
    });
    if (!updatedUser)
      throw new NotFoundException("Error getTwoFactorAuthenticationSecret");
    return updatedUser.twoFactorAuthenticationSecret;
  }
}