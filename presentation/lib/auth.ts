import { cookies } from "next/headers";

/**
 * Verifica si el usuario está autenticado
 * En producción, esto debería verificar un token JWT válido
 */
export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth-token");

  // En producción, aquí verificarías el token con tu backend
  // Por ahora, simplemente verificamos si existe
  return !!authToken;
}

/**
 * Obtiene el usuario actual desde el token
 * En producción, esto debería decodificar el JWT y obtener los datos del usuario
 */
export async function getCurrentUser() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth-token");

  if (!authToken) {
    return null;
  }

  // En producción, decodificarías el JWT aquí
  // Por ahora, retornamos datos simulados
  return {
    id: "1",
    name: "Usuario Demo",
    email: "demo@porraza.com",
  };
}
