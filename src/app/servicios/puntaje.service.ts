import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, getDoc, updateDoc } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PuntajeService {
  constructor(private firestore: Firestore, private authService: AuthService) {}

  // Obtener el correo del usuario logueado
  private getUserEmail(): string | null {
    const currentUser = this.authService.getCurrentUser();
    return currentUser ? currentUser.email : null;
  }

  // Guardar o actualizar el puntaje del usuario para un juego
  async guardarPuntaje(juego: string, puntos: number): Promise<void> {
    const email = this.getUserEmail();
    if (email) {
      const docRef = doc(this.firestore, `puntajes/${email}`);
      await updateDoc(docRef, { [juego]: puntos }).catch(async (error) => {
        if (error.code === 'not-found') {
          await setDoc(docRef, { email, [juego]: puntos });
        }
      });
    }
  }

  // Obtener el puntaje del usuario para un juego
  async obtenerPuntaje(juego: string): Promise<number> {
    const email = this.getUserEmail();
    if (email) {
      const docRef = doc(this.firestore, `puntajes/${email}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data()[juego] ?? 0;
      }
    }
    return 0;
  }
}
