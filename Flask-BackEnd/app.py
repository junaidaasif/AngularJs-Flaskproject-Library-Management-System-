from datetime import datetime

from flask import Flask, render_template, request, redirect, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import redirect
from flask_marshmallow import Marshmallow
from flask_cors import CORS , cross_origin




app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql://root:root@localhost:3306/crud" #url for data base like java application properties
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Config MySQL
# app.config['MYSQL_HOST'] = 'localhost'
# app.config['MYSQL_USER'] = 'root'
# app.config['MYSQL_PASSWORD'] = 'Junaid@123'
# app.config['MYSQL_DB'] = 'crud'
# app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
# init MYSQL
# mysql = MySQL(app)

# Init db 
db = SQLAlchemy(app)

# Init Marshmallow
ma = Marshmallow(app)

# Library Model 
class libraryManage(db.Model):
    sno = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    type = db.Column(db.String(200), nullable=False)
    author = db.Column(db.String(200), nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self) -> str:
        return f"{self.sno} - {self.name}"

# Library schema 
class libSchema(ma.Schema):
    class Meta:
        fields = ("sno", "name", "type", "author", "date_created")

# Init schema
lib_schema = libSchema()
libs_schema = libSchema(many=True)



@app.route('/', methods=['GET', 'POST'])
def home():
    allLibrary = libraryManage.query.all()
    

    return libs_schema.jsonify(allLibrary)



@app.route('/addLib', methods=['POST'])
def addLib():

        name = request.json['name']
        type = request.json['type']
        author = request.json['author']
       
        if(name=="" or type=="" or author==""):
            return "you were not provide right detail"
        library = libraryManage(name=name, type=type, author=author)
        db.session.add(library) #adding
        db.session.commit()  #saving in database
        return lib_schema.jsonify(library)


   


  

@app.route("/delete/<int:sno>", methods=['DELETE'])
def delete(sno):
    allLibrary = libraryManage.query.get(sno)
    
    db.session.delete(allLibrary) 
    db.session.commit()
    
    return "deleted"


@app.route("/deleteAll", methods=['DELETE'])
def deleteAll():
    db.session.query(libraryManage).delete()
    db.session.commit()
  
 
    return "All deleted"


@app.route("/update/<int:sno>", methods=['PUT'])
def update(sno):
    if request.method == 'PUT':
        name = request.json['name']
        type = request.json['type']
        author = request.json['author']
       

        updateLib = libraryManage.query.get(sno)
        updateLib.name = name
        updateLib.type = type
        updateLib.author = author
        db.session.add(updateLib) #adding
        db.session.commit()  #saving in database
        
        return lib_schema.jsonify(updateLib)
    updateLib = libraryManage.query.get(sno)
    # print(allLibrary)
    # db.session.delete(allLibrary) 
    # db.session.commit()
    return render_template("update.html", updateLib = updateLib )





if __name__ == "__main__":
    app.run(debug=True, port=8000)