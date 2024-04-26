import json
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from . import dbcon

# Create your views here.
@api_view(['GET'])
def home_view(request):
    response = Response({"message":"Success"})

    return response

@api_view(['GET','POST','DELETE'])
def item_view(request):

    print(request.method)

    response_headers = {"Access-Control-Allow-Origin":"*"}
    
    try:

        if request.method == 'GET':
            query = "select * from products"

            df = dbcon.processquery(query=query)

            df_json = df.to_json(orient='records')

            data_to_return = json.loads(df_json)

            response = Response(data_to_return,headers=response_headers)

        elif request.method == 'POST':

            product_name = request.data.get('product_name')
            product_price = request.data.get('product_price')
            description = request.data.get('description')

            query = """INSERT INTO public.products(
            product_name, product_price, description)
            VALUES (%(product_name)s,%(product_price)s,%(description)s) returning product_id;"""

            args = {
                "product_name":product_name,
                "product_price":product_price,
                "description":description,
            }

            # Sample Data
            {
                "product_name":"product_name",
                "product_price":"200",
                "description":"description"
            }

            product_id = dbcon.excute_query_return_result(query=query,args=args)[0][0]

            response = Response({"message":"Product Added","product_id":product_id},headers=response_headers)

        else:
            # request.method == 'DELETE':

            product_id = request.data.get('product_id')

            query = "delete from products where product_id = %(product_id)s"

            args = {
                "product_id":product_id
            }

            dbcon.excute_query(query=query,args=args)

            response = Response({"message":"Product Delete Successful"},headers=response_headers)
            
            return response


        return response
    except Exception as e:
        print(e)
        response = Response({"message":"Failed to Excute API"})

        return response

