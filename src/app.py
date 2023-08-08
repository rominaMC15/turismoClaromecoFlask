from flask import Flask ,jsonify,request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
app=Flask(__name__)
CORS(app)
# configuro la base de datos, con el nombre el usuario y la clave
#app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://root:@localhost/turismo'
#app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://sql10638186:ZKu7N8uPGL@sql10.freemysqlhosting.net/sql10638186'
app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://urksxelsuqavygfz:AQuj5FKVxpkpYkFsuppm@bzrri3b71ixhaqvreaeh-mysql.services.clever-cloud.com/bzrri3b71ixhaqvreaeh'
#                                               user:clave@localhost/nombreBaseDatos
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False
db= SQLAlchemy(app)
ma=Marshmallow(app)
# defino la tabla
class Producto(db.Model):   # la clase Producto hereda de db.Model     
    id=db.Column(db.Integer, primary_key=True)   #define los campos de la tabla
    nombre=db.Column(db.String(100))
    mail=db.Column(db.Integer)
    mensaje=db.Column(db.Integer)
    def __init__(self,nombre,mail,mensaje):   #crea el  constructor de la clase
        self.nombre=nombre   # no hace falta el id porque lo crea sola mysql por ser auto_incremento
        self.mail=mail
        self.mensaje=mensaje
 
db.create_all()  # crea las tablas
#  ************************************************************
 
class ProductoSchema(ma.Schema):
    class Meta:
        fields=('id','nombre','mail','mensaje')
producto_schema=ProductoSchema()            # para crear un producto
productos_schema=ProductoSchema(many=True)  # multiples registros
 
 
#endpoint para deploy


# crea los endpoint o rutas (json)
@app.route('/mensajes',methods=['GET'])
def get_Productos():
    all_productos=Producto.query.all()     # query.all() lo hereda de db.Model
    result=productos_schema.dump(all_productos)  # .dump() lo hereda de ma.schema
    return jsonify(result)
 
 
@app.route('/mensajes/<id>',methods=['GET'])
def get_producto(id):
    producto=Producto.query.get(id)
    return producto_schema.jsonify(producto)

@app.route('/mensajes/<id>',methods=['DELETE'])
def delete_producto(id):
    producto=Producto.query.get(id)
    db.session.delete(producto)
    db.session.commit()
    return producto_schema.jsonify(producto)

@app.route('/mensajes', methods=['POST']) # crea ruta o endpoint
def create_producto():
    print(request.json)  # request.json contiene el json que envio el cliente
    nombre=request.json['nombre']
    mail=request.json['mail']
    mensaje=request.json['mensaje']
    new_producto=Producto(nombre,mail,mensaje)
    db.session.add(new_producto)
    db.session.commit()
    return producto_schema.jsonify(new_producto)

@app.route('/mensajes/<id>' ,methods=['PUT'])
def update_producto(id):
    producto=Producto.query.get(id)
   
    nombre=request.json['nombre']
    mail=request.json['mail']
    mensaje=request.json['mensaje']
 
    producto.nombre=nombre
    producto.mail=mail
    producto.mensaje=mensaje
    db.session.commit()
    return producto_schema.jsonify(producto)
 
 
 
# programa principal *******************************
if __name__=='__main__':  
    app.run(debug=True, port=5000)