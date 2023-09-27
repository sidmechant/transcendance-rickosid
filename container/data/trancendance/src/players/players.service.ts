import { Injectable, NotFoundException } from '@nestjs/common';
import { Player } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PlayersService {
  constructor(private readonly prisma: PrismaService) {

  }

  /**
   * Récupère un joueur par son ID.
   * @param id - L'ID du joueur à rechercher.
   * @returns Le joueur trouvé.
   * @throws NotFoundException si le joueur n'est pas trouvé.
   */
  async getPlayerById(id: number): Promise<Player> {
    try {
      let player = await this.prisma.player.findUnique({
        where: {
          id: id,
        },
      });
      if (player) return player;
      throw new NotFoundException();
    } catch (error) {
      console.log("Error in getPlayerById");
      throw new NotFoundException("Error in getPlayerById: Une erreur s'est produite lors de la recherche du joueur à partir de son ID.");
    }
  }

  /**
   * Met à jour l'URL de la photo de profil d'un joueur.
   * @param id - L'ID du joueur à mettre à jour.
   * @param urlPhotoProfile - La nouvelle URL de la photo de profil.
   * @returns Le joueur mis à jour.
   * @throws NotFoundException si le joueur n'est pas trouvé.
   */
  async setPlayerUrlPhotoProfile(id: number, urlPhotoProfile: string): Promise<Player> {
    try {
      const updatedPlayer = await this.prisma.player.update({
        where: { id },
        data: { urlPhotoProfile },
      });
      if (updatedPlayer) return updatedPlayer;
      throw new NotFoundException();
    } catch (error) {
      console.log("Error in setPlayerUrlPhotoProfile");
      throw new Error("Error in setPlayerUrlPhotoProfile: Une erreur s'est produite lors de la mise à jour de l'URL de la photo de profil du joueur.");
    }
  }

  /**
   * Met à jour le pseudo d'un joueur.
   * @param id - L'ID du joueur à mettre à jour.
   * @param pseudo - Le nouveau pseudo du joueur.
   * @returns Le joueur mis à jour.
   * @throws NotFoundException si le joueur n'est pas trouvé.
   */
  async setPlayerPseudo(id: number, pseudo: string): Promise<Player> {
    try {
      const updatedPlayer = await this.prisma.player.update({
        where: { id },
        data: { pseudo },
      });
      if (updatedPlayer) return updatedPlayer;
      throw new NotFoundException();
    } catch (error) {
      console.log("Error in updatePlayerPseudo");
      throw new Error("Error in updatePlayerPseudo: Une erreur s'est produite lors de la mise à jour du pseudo du joueur.");
    }
  }

  /**
   * Récupère tous les matches associés à un joueur par son ID.
   * @param id - L'ID du joueur.
   * @returns Un tableau de tous les matches joués par le joueur.
   * @throws NotFoundException si le joueur n'est pas trouvé.
   */
  async getAllMatchesByPlayerId(id: number): Promise<any> {
    try {
      const player = await this.prisma.player.findUnique({
        where: { id },
        include: {
          matchesA: true,
          matchesB: true,
        },
      });
      if (player) {
        const matchesA = player.matchesA || [];
        const matchesB = player.matchesB || [];
        const matches = [...matchesA, ...matchesB];
        return matches;
      }
      throw new NotFoundException();
    } catch (error) {
      console.log("Error in getAllMatchesByPlayerId");
      throw new NotFoundException("Error in getAllMatchesByPlayerId: Une erreur s'est produite lors de la recherche de tous les matches joués par le joueur.");
    }
  }

  /**
   * Récupère tous les joueurs.
   * @returns Un tableau de tous les joueurs.
   * @throws Error si une erreur se produit lors de la récupération des joueurs.
   */
  async getAllPlayers(): Promise<Player[]> {
    try {
      const players = await this.prisma.player.findMany();
      return players;
    } catch (error) {
      console.log("Error in getAllPlayers");
      throw new Error("Error in getAllPlayers: Une erreur s'est produite lors de la récupération des joueurs.");
    }
  }

  /**
   * Supprime un joueur par son ID.
   * @param playerId - L'ID du joueur à supprimer.
   * @returns Le joueur supprimé.
   * @throws Error si une erreur se produit lors de la suppression du joueur.
   */
  async deletePlayer(playerId: number): Promise<Player> {
    try {
      const deletedPlayer = await this.prisma.player.delete({
        where: {
          id: playerId,
        },
      });
      return deletedPlayer;
    } catch (error) {
      console.log("deletePlayer");
      throw new Error("deletePlayer: Une erreur s'est produite lors de la suppression du joueur.");
    }
  }

}
