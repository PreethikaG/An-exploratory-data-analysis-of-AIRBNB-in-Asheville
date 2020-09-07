# IMPORT DEPENDENCIES

import os
from os import environ
import pandas as pd
import numpy as np
import datetime as dt
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
import pprint
from config import Config

# env_var = os.environ
# pprint.pprint(dict(env_var), width = 1)


# CREATE A FLASK INSTANCE
app = Flask(__name__)

# SETUP FLASK SQLALCHEMY 
# app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get('SQLALCHEMY_DATABASE_URI')
app.config.from_object(Config)
db = SQLAlchemy(app)

# db = app.config['SQLALCHEMY_DATABASE_URI']
# engine = create_engine(db)

# Create engine

# conn_str = "postgres://aipqvzakwuyayg:b2ada3ef206b1daa65925a6a7395232d2781dec6e408447ca427f2d587ac7a8c@ec2-34-236-215-156.compute-1.amazonaws.com:5432/d7967csi9o61pv"
engine = create_engine(os.environ.get('SQLALCHEMY_DATABASE_URI'))


#  Reflect the database 
Base = automap_base()

#  Reflect the tables
Base.prepare(db.engine, reflect=True)

#Save reference to the table
# Listingratingcount = Base.classes.listing_rating_count

Listing_detail_df_new = Base.classes.listing_detail_df_new


# Route to render index.html template using data from Mongo
@app.route("/")
def index():

    # Return template and data
    return render_template("index.html")


@app.route("/growth_analysis_js")

def growthanalysisjsf():
       
    # Create session
    session = Session(engine)
    
    # Query the table for columns of interest
    hostsince = session.query(Listing_detail_df_new).all()

    #Close the session
    session.close()
    
    # Create a list of dictionaries for each column
    hosts_list = []
     
    for Eachhost in hostsince:
        
        hosts_dict = {}
        hosts_dict["id"] = Eachhost.id
        hosts_dict["host_since"] = Eachhost.host_since
        
        
        hosts_list.append(hosts_dict)
    
    # Return the json
    return jsonify(hosts_list)

@app.route("/data_cleaning_ht")
def datacleaninghtf():
    """Return the Data Cleaning page of Airbnb html"""
    return render_template("pg_data_cleaning.html")

@app.route("/growth_analysis_ht")
def growthanalysishtf():
    """Return the Growth analysis of Airbnb html"""
    return render_template("pg_growth_analysis.html")


@app.route("/superhost_analysis_ht")
def superhostanalysishtf():
    """Return the super host analysis of Airbnb html"""
    return render_template("pg_superhost_analysis.html")

@app.route("/price_analysis_ht")
def priceanalysishtf():
    """Return the price analysis of Airbnb html"""
    return render_template("pg_price_analysis.html")

@app.route("/airbnb_locator_ht")
def airbnblocatorhtf():
    """Return the airbnb locator page"""
    return render_template("airbnblocator.html")


if __name__ == "__main__":
    app.run(debug=True)
