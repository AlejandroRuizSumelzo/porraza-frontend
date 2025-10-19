import Link from "next/link";
import { Button } from "@/presentation/components/ui/button";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 border-b">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            Porraza
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/pricing">
              <Button variant="ghost">Pricing</Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Términos y Condiciones
        </h1>

        <div className="prose prose-lg">
          <p className="text-gray-600 mb-6">
            Última actualización: {new Date().toLocaleDateString("es-ES")}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Aceptación de los Términos
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Al acceder y utilizar Porraza, aceptas estar sujeto a estos
              términos y condiciones. Si no estás de acuerdo con alguno de estos
              términos, no debes utilizar nuestros servicios.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. Uso del Servicio
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Te comprometes a:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Usar el servicio de manera legal y apropiada</li>
              <li>No interferir con el funcionamiento del servicio</li>
              <li>No intentar acceder a cuentas de otros usuarios</li>
              <li>Mantener la confidencialidad de tus credenciales</li>
              <li>No utilizar el servicio para actividades ilegales</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. Cuentas de Usuario
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Eres responsable de mantener la seguridad de tu cuenta y
              contraseña. Porraza no se hace responsable de pérdidas derivadas
              del uso no autorizado de tu cuenta.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. Propiedad Intelectual
            </h2>
            <p className="text-gray-700 leading-relaxed">
              El contenido, características y funcionalidad de Porraza son
              propiedad de la empresa y están protegidos por leyes de derechos
              de autor, marcas registradas y otras leyes de propiedad
              intelectual.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Pagos y Facturación
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Al suscribirte a un plan de pago:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Autorizas cargos recurrentes según el plan seleccionado</li>
              <li>Los precios pueden cambiar con aviso previo de 30 días</li>
              <li>Puedes cancelar tu suscripción en cualquier momento</li>
              <li>No se ofrecen reembolsos por periodos parciales</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. Limitación de Responsabilidad
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Porraza se proporciona "tal cual" sin garantías de ningún tipo. No
              seremos responsables de daños indirectos, incidentales o
              consecuentes que surjan del uso del servicio.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. Modificaciones
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Nos reservamos el derecho de modificar estos términos en cualquier
              momento. Los cambios entrarán en vigor inmediatamente después de
              su publicación.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              8. Contacto
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Para preguntas sobre estos términos, contáctanos en:
              legal@porraza.com
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center">
            <div className="text-gray-600">
              © 2025 Porraza. Todos los derechos reservados.
            </div>
            <div className="flex gap-6">
              <Link
                href="/legal/privacy"
                className="text-gray-600 hover:text-gray-900"
              >
                Privacidad
              </Link>
              <Link
                href="/legal/terms"
                className="text-gray-600 hover:text-gray-900"
              >
                Términos
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
