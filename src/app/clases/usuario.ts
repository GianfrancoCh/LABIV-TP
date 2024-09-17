export class User {
	usuario: string;
	email: string;
	password: string;
    rol: string;

	constructor(email: string, password: string, usuario: string, rol: string) {
		this.email = email;
		this.password = password;
		this.usuario = usuario;
		this.rol = rol;
	}
}