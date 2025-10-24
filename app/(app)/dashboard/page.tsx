"use client";

import {
  SidebarTrigger,
  useSidebar,
} from "@/presentation/components/ui/sidebar";
import { Button } from "@/presentation/components/ui/button";

export default function DashboardPage() {
  const { open } = useSidebar();

  return (
    <div className="flex h-full flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        {!open && <SidebarTrigger />}
        <h1 className="text-xl font-semibold">Dashboard</h1>
      </header>

      <main className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-7xl">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="mb-2 text-3xl font-bold text-gray-900">
              Bienvenido de vuelta
            </h2>
            <p className="text-gray-600">
              Aquí tienes un resumen de tu actividad reciente
            </p>
          </div>

          {/* Stats Grid */}
          <div className="mb-8 grid gap-6 md:grid-cols-4">
            <div className="rounded-lg bg-white p-6 shadow">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <svg
                    className="h-6 w-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-green-600">+12%</span>
              </div>
              <p className="text-sm text-gray-600">Total Proyectos</p>
              <p className="text-3xl font-bold text-gray-900">24</p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                  <svg
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-green-600">+8%</span>
              </div>
              <p className="text-sm text-gray-600">Usuarios Activos</p>
              <p className="text-3xl font-bold text-gray-900">1,284</p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                  <svg
                    className="h-6 w-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-green-600">+23%</span>
              </div>
              <p className="text-sm text-gray-600">Ingresos Totales</p>
              <p className="text-3xl font-bold text-gray-900">$45,231</p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                  <svg
                    className="h-6 w-6 text-orange-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-red-600">-5%</span>
              </div>
              <p className="text-sm text-gray-600">Tasa de Conversión</p>
              <p className="text-3xl font-bold text-gray-900">3.2%</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg bg-white shadow">
              <div className="border-b border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Actividad Reciente
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    {
                      action: "Nuevo proyecto creado",
                      project: "Diseño UI/UX",
                      time: "Hace 2 horas",
                    },
                    {
                      action: "Reunión completada",
                      project: "Cliente ABC",
                      time: "Hace 4 horas",
                    },
                    {
                      action: "Tarea asignada",
                      project: "Desarrollo Backend",
                      time: "Hace 6 horas",
                    },
                    {
                      action: "Informe generado",
                      project: "Análisis Q1",
                      time: "Hace 1 día",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="mt-2 h-2 w-2 rounded-full bg-blue-600"></div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">
                          {item.action}
                        </p>
                        <p className="text-sm text-gray-600">{item.project}</p>
                      </div>
                      <span className="text-sm text-gray-500">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-white shadow">
              <div className="border-b border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Proyectos Activos
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    {
                      name: "Rediseño Web",
                      progress: 75,
                      status: "En progreso",
                    },
                    {
                      name: "App Móvil",
                      progress: 45,
                      status: "En desarrollo",
                    },
                    {
                      name: "Marketing Q2",
                      progress: 90,
                      status: "Casi completado",
                    },
                    {
                      name: "Análisis de Datos",
                      progress: 30,
                      status: "Iniciado",
                    },
                  ].map((project, index) => (
                    <div key={index}>
                      <div className="mb-2 flex items-center justify-between">
                        <span className="font-medium text-gray-900">
                          {project.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          {project.progress}%
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-200">
                        <div
                          className="h-2 rounded-full bg-blue-600"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <span className="mt-1 block text-xs text-gray-600">
                        {project.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 rounded-lg bg-white p-6 shadow">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              Acciones Rápidas
            </h3>
            <div className="grid gap-4 md:grid-cols-4">
              <Button className="w-full">
                <svg
                  className="mr-2 h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Nuevo Proyecto
              </Button>
              <Button variant="outline" className="w-full">
                <svg
                  className="mr-2 h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                Invitar Equipo
              </Button>
              <Button variant="outline" className="w-full">
                <svg
                  className="mr-2 h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Ver Reportes
              </Button>
              <Button variant="outline" className="w-full">
                <svg
                  className="mr-2 h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Configuración
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
