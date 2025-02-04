# FiduBogotá

Proyecto de pruebas automatizadas aplicando POM.

## Tecnologías utilizadas

```
- Playwright
- Node
- TypeScript
- Git

```

## Requerimientos

Para ejecutar este proyecto, tenga en cuenta los siguientes requisitos del sistema:

```
- Versión recomendada Node 20.16.0. Se pueden utilizar versiones superiores a la versión 18.0.0
- Windows 10+, Windows Server 2016+ o Subsistema de Windows para Linux (WSL).
- macOS 13 Ventura o macOS 14 Sonoma.
- Debian 11, Debian 12, Ubuntu 20.04 o Ubuntu 22.04, Ubuntu 24.04, en arquitectura x86-64 y arm64.
```

## Intalación

### Clonar el repositorio

- Navegue al directorio donde se clonará el proyecto y ejecute el siguiente comando:

```
git clone <URL_DEL_REPOSITORIO>
```
### Ubicarse en el proyecto

- Abra Visual Studio Code (IDE usado para el desarrollo) y, en la terminal, navegue al directorio del proyecto:

```
cd nombre_del_proyecto
```
### Instalar dependencias

- Ejecute el siguiente comando para instalar las dependencias necesarias:

```
npm install
```
### Configurar variables de entorno

- Cree un archivo llamado .env en la raíz del proyecto (el mismo directorio donde se encuentra el archivo package.json) y configure las siguientes variables de entorno:

```
ADDRESS_URL= aquí se añade la URL del entorno de calidad
USER_MAIL= aquí se añade el email de un usuario con permisos de autenticación
PASSWORD= aquí se añade la contraseña para el usuario anterior
API_LOGIN_URL= aquí se añade la URL del API de inicio de sesión

```

## ¿Cómo ejecutar una prueba?

### Ejecución de pruebas individuales

- Para ejecutar una prueba se usa el comando *npx playwright test* mas *el nombre del test a ejecutar*, por ejemplo:

```
npx playwright test landing-page.spec.ts
```
### Ejecución de pruebas múltiples

- Para ejecutar un conjunto de archivos de prueba desde diferentes directorios, pase los nombres de los directorios en los que desea ejecutar las pruebas. Por ejemplo, en la estructura principal del proyecto, dentro de la carpeta tests, se tienen subcarpetas que contienen archivos de prueba. Para ejecutarlos, utilice *tests/nombre-de-la-subcarpeta*, por ejemplo *auth*, y así sucesivamente para la ejecución de los demás, utilice el comando así:

```
npx playwright test tests/auth/ tests/home/
```
### Ejecución de pruebas desde el navegador

- Para ejecutar pruebas con visualización desde el navegador se debe añadir *--headed* al comando, por ejemplo:

```
npx playwright test landing-page.spec.ts --headed
```
### Navegadores para la ejecución de pruebas 

- Para ejecutar pruebas en un navegador específico o en diferentes navegadores, es necesario añadir la opción *--project* al comando, seguido del nombre del navegador. Cabe destacar que Playwright soporta la ejecución de pruebas en los siguientes navegadores:

- webkit,
- chromium,
- firefox

Por ejemplo, para ejecutar una prueba en el navegador WebKit, utilice el siguiente comando:

```
npx playwright test landing-page.spec.ts --project webkit
```

O, en varios navegadores, por ejemplo, para ejecutar una prueba tanto en WebKit como en Firefox, utilice el siguiente comando:

```
npx playwright test landing-page.spec.ts --project webkit --project firefox
```
### Ejecución de pruebas con titulo


- Para ejecutar una prueba con un título específico (es decir, el nombre asignado a cada test individual), utilice la opción *-g* seguida del título de la prueba. Por ejemplo:

```
npx playwright test landing-page.spec.ts -g "add a todo item"
```
### Ejecución de pruebas desde el inspector

- Para depurar las pruebas utilizando el inspector, utilice la opción *--debug* al comando de ejecución. Ejecute el comando de la siguiente manera:

```
npx playwright test landing-page.spec.ts --debug
```
### Ejecución de pruebas en modo UI

- Para depurar las pruebas en modo UI utilice la opción *--ui* al final del comando. Ejecute el comando de la siguiente manera:

```
npx playwright test landing-page.spec.ts --ui
```
Para conocer más sobre la ejecución de pruebas con el modo UI visite [Running and debugging test](https://playwright.dev/docs/running-tests#run-tests-in-vs-code).

### Ejecución de pruebas por etiqueta

- Para ejecutar las pruebas filtradas por etiqueta (descritas en el informe de pruebas en la columna *Criterio de Aceptación* definidos para cada caso de prueba), utilice el comando con la opción *--grep*, seguida del nombre de la etiqueta precedido por un @. Por ejemplo:

```
npx playwright test --grep @CP01
```

### Omitir pruebas por etiqueta

- Para omitir las pruebas con una etiqueta específica, utilice la opción *--grep-invert*, seguida del nombre de la etiqueta precedido por un @. Por ejemplo:

```
npx playwright test --grep-invert @CP02
```
## Reporte de pruebas

- Para revisar los reportes de los test que se han ejecutado en formato HTML, después de la ejecución de cada prueba utilice el siguiente comando:

```
npx playwright show-report
```
**Nota:** Cuando un test falla, playwright ejecuta este comando automaticamente para realizar la revision de lo que ha fallado.

# Detalles generales de la implementación

El proyecto está implementado bajo el patrón de diseño POM(Page Object Model), su distribución está comprendida de la siguiente manera (el nombre de los archivos mencionados a continuación están en modo de ejemplo):

## Estructura del Proyecto

```plaintext
src
├── pages
│   ├── auth
│   │   ├── login-page.ts
│   │   ├── register-page.ts
│   ├── home
│   │   ├── home-page.ts
│   │   ├── stats-page.ts
│   └── ...(Otras secciones)
├── tests
│   ├── auth
│   │   ├── login-test.spec.ts
│   │   ├── register-test.spec.ts
│   ├── home
│   │   ├── home-page-test.spec.ts
│   │   ├── dashboard-test.spec.ts
│   └── ...(Otras subcarpetas de prueba)
├── utils
│   ├── auth
│   │   ├── auth-util.ts
│   │   ├── formatter-util.ts
│   ├── test-setup
│   │   ├── test-setup-util.ts
│   └── ...(Otras utilidades)
├── interfaces
│   ├── IBasicDataPage.ts
│   └── IOtherInterface.ts
├── playwright.config.ts
├── package-lock.json
├── package.json
└── README.md

```

Su estructura se plantea así:

1. *src:* Carpeta raíz del código fuente del proyecto.
2. *pages:* Contiene las subcarpetas que a su vez contienen las definiciones de las páginas de la aplicación.

- *auth* y *home*: Subcarpetas que contienen los archivos para las páginas de autenticación.
   - login-page.ts: Archivo que define la página de inicio de sesión.

3. *tests:* Contiene las subcarpetas que a su vez alojan las pruebas automatizadas del proyecto.

- *auth* y *home*:  Subcarpetas que contienen los archivos para las pruebas de autenticación.
  - *login-test.spec.ts:* Archivo de pruebas para la página de inicio de sesión.

4. *utils:* Contiene las subcarpetas que a su vez contienen las utilidades y funciones auxiliares.

5. *interfaces* Contiene las interfaces para cada clase usada en las interacciones y operaciones por pantalla, definiendo contratos claros para su implementación.

- *auth* y *test-setup*: Subcarpetas que contienen los archivos de utilidades.
  - *aut-util.ts:* Archivo que define algunas utilidades para el login.

6. *playwright.config.ts:* Archivo de configuración para Playwright.


## Autores

- [Gilber Cuadrado](https://github.com/GilberCuad)