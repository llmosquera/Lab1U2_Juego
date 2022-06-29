#Importamos las librerias de flask
import os
from flask import Flask, redirect, render_template, request, url_for
#Intanciar la aplicacion
app = Flask(__name__)


#Decorador para definir la ruta inicio
@app.route('/')
#Crea la funcion para llamar a la pagina de inicio
def Inicio():
      #restorna la plantilla jueguito.html
    return render_template('Inicio.html')

#Decorador para definir la ruta inicio
@app.route('/index')
#Crea la funcion para llamar a la pagina de inicio
def index():
      #restorna la plantilla jueguito.html
    return render_template('index.html')

if __name__ == '__main__':
    #debug para reiniciar el servidor
    app.run(debug=True)   