# challenge-magister
Aplicación web para Magister - Pasos para Instalar el proyecto

1º Instalar Angular

Si ya tienes instalado NodeJS y Angular, puedes ir al punto 2º y saltarte estos pasos.
Este es un proyecto creado con el framework de Angular, si no tienes NodeJS o quieres tener la última versión de Angular puedes seguir estos pasos:

  	
	1- Lo primero que necesitamos para instalar Angular es instalar el programa de paquetes NodeJS de su web, ya que este es el programa de paquetes y dependencias de JavaScript ► https://nodejs.org/es/ ◄.
  
	2- Lo siguiente que haremos será abrir nuestro "símbolos de sistema" o cmd y vamos a actualizar npm con → npm install -g npm@latest ←.

	3- Luego utilizaremos → npm cache clean --force ← para limpiar la cache.
	
	4- Seguidamente utilizaremos → npm set audit false ← para evitar la auditoria de npm porque suele dar problemas.
	
	5- Ahora ponemos → npm uninstall -g angular-cli ← y → npm uninstall -g @angular/cli ←	para eliminar la versión antigua que tenemos de Angular.

	6- Borramos de nuevo la cache → npm cache clean --force ← y terminamos de instalar la última versión de Angular con → npm install -g @angular/cli@latest ← .


Después para crear y construir un nuevo proyecto básico de Angular en un servidor de desarrollo, hay que ir al directorio donde vas a trabajar e instalar el proyecto y usar los siguientes comandos, 
para crear la carpeta y el proyecto con los archivos:

			ng new nombre-del-proyecto 
	
 // Cuando nos pregunte sobre instalar el routing, le decimos "N", ya que está configurado en el proyecto.
 // Luego nos pregunta que hoja de estilos queremos usar, podemos dejar el default que es CSS.

________________________________________________
________________________________________________

2º Incluir los datos del proyecto
 
Una vez tenemos el proyecto de Angular creado, solo tienes que copiar y remplazar los archivos de mi proyecto al proyecto que has creado.
En total son dos archivos que contienen los módulos del proyecto y los distintos componentes y configuraciones dentro de la carpeta "src".

________________________________________________
________________________________________________


3º Actualizar el proyecto y sus módulos
 
Mi proyecto tenía varias bibliotecas que Angular no tiene al cargar el proyecto, que te indico a continuación:
- AngularFirebase, para enlazar con Firebase y recoger así los datos que hemos guardado allí para mostrarlos en la vista del formulario.
- Bootstrap, es una biblioteca de estilos muy útil para maquetar de forma rápida y responsive.
- jQuery, es una biblioteca de JavaScript que he utilizado para algunas funciones.

Para que no tengas que instalar cada módulo, el archivo "package.json" tiene estos módulos definidas en la sección de "dependencies".
  Simplemente entra en la carpeta de tu proyecto desde tus "símbolos de sistema" o cmd y escribe el comando → npm update ←.
  Automáticamente se te habrán instalado.
  
  

4º Iniciar el proyecto
Escribe en tus "símbolos de sistema" o cmd → ng serve ←, esto recopilará todo el contenido del proyecto y lo plasmará de forma predeterminada la URL: http://localhost:4200/



