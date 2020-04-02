import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template, redirect

from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)


#################################################
# Database Setup
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/covid19.sqlite"
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

# Save references to each table
BTC = Base.classes.BTC
DJI = Base.classes.DJI
SNP = Base.classes.SNP
NAS = Base.classes.Nasdaq
#VIX = Base.classes.VIX
US_Covid19 = Base.classes.US_Covid19
IT_Covid19 = Base.classes.IT_Covid19
CN_Covid19 = Base.classes.CN_Covid19
STOCKS = Base.classes.stocks

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

#controller route - API route
@app.route("/dji")
def dji():
    
    # Use Pandas to perform the sql query
    query = db.session.query(DJI.id,DJI.datetime,DJI.open,DJI.high,DJI.low,DJI.close,DJI.volume).all()
    df = pd.DataFrame(query)

    # Return a list of the column names 
    return jsonify(df.to_dict("record"))

@app.route("/btc")
def btc():
    
    # Use Pandas to perform the sql query
    query = db.session.query(BTC.id,BTC.datetime,BTC.open,BTC.high,BTC.low,BTC.close).all()
    df = pd.DataFrame(query)

    # Return a list of the column names 
    return jsonify(df.to_dict("record"))

@app.route("/snp")
def snp():
    
    # Use Pandas to perform the sql query
    query = db.session.query(SNP.id,SNP.datetime,SNP.open,SNP.high,SNP.low,SNP.close).all()
    df = pd.DataFrame(query)

    # Return a list of the column names 
    return jsonify(df.to_dict("record"))

@app.route("/nas")
def nas():
    
    # Use Pandas to perform the sql query
    query = db.session.query(NAS.id,NAS.datetime,NAS.open,NAS.high,NAS.low,NAS.close).all()
    df = pd.DataFrame(query)

    # Return a list of the column names 
    return jsonify(df.to_dict("record"))
   
# @app.route("/vix")
# def vix():
    
#     # Use Pandas to perform the sql query
#     query = db.session.query(VIX.id,VIX.datetime,VIX.open,VIX.high,VIX.low,VIX.close).all()
#     df = pd.DataFrame(query)

#     # Return a list of the column names 
#     return jsonify(df.to_dict("record"))

@app.route("/stocks")
def stocks():
    """Return a list of sample names."""

    # Use Pandas to perform the sql query
    query = db.session.query(STOCKS.id,STOCKS.name,STOCKS.datetime,STOCKS.open,STOCKS.high,STOCKS.low,STOCKS.close).all()
    df = pd.DataFrame(query)

    # Return a list of the column names 
    return jsonify(df.to_dict("record"))

@app.route("/us")
def us():
    """Return a list of sample names."""

    # Use Pandas to perform the sql query
    query = db.session.query(US_Covid19.id,US_Covid19.Date,US_Covid19.Cases).all()
    df = pd.DataFrame(query)

    # Return a list of the column names 
    return jsonify(df.to_dict("record"))

@app.route("/it")
def it():
    """Return a list of sample names."""

    # Use Pandas to perform the sql query
    query = db.session.query(IT_Covid19.id,IT_Covid19.Date,IT_Covid19.Cases).all()
    df = pd.DataFrame(query)

    # Return a list of the column names 
    return jsonify(df.to_dict("record"))

@app.route("/cn")
def cn():
    """Return a list of sample names."""

    # Use Pandas to perform the sql query
    query = db.session.query(CN_Covid19.id,CN_Covid19.Date,CN_Covid19.Cases).all()
    df = pd.DataFrame(query)

    # Return a list of the column names 
    return jsonify(df.to_dict("record"))


if __name__ == "__main__":
    app.run(debug=True)
