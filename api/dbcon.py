import psycopg2

from sqlalchemy import create_engine

import pandas as pd

user = 'admin'
password = 'lb1234'
host = '199.241.138.96'
dbname = 'testing'
port = '4000'


def create_connection():
    conn = psycopg2.connect(
    database=dbname , user=user, password= password, host=host , port= port,application_name= 'TechDjangoData'
    )

    return conn

engine = create_engine(f"postgresql+psycopg2://{user}:{password}@{host}:{port}/{dbname}")

conn = create_connection()

def processquery(query: str,application_name:str="") -> pd.DataFrame:
    # conn = psycopg2.connect(
    # database=db , user=username, password= password, host=host , port= port
    # )

    """returns the query as pandas dataframe from database
    Args:
    --------
        query (str): query
    
    Returns:
    ---------
        data: pandas dataframe from query
    """
    table = pd.read_sql(query, con=engine)
    
    return table

def excute_query(query:str,args={},application_name:str=""):
    
    global conn
    
    try:
        if conn.closed != 0:
            conn = create_connection()
        cursor = conn.cursor()   
        
        cursor.execute(query=query,vars=args)
        
        conn.commit()

    except Exception as e:
        conn.rollback()
        conn.close()
        raise Exception(e)
    
def excute_query_return_result(query:str,args={},application_name:str=""):
    
    global conn
    
    try:
        if conn.closed != 0:
            conn = create_connection()
        cursor = conn.cursor()   
        
        cursor.execute(query=query,vars=args)
        
        conn.commit()
        
    except Exception as e:
        conn.rollback()
        conn.close()
        raise Exception(e)