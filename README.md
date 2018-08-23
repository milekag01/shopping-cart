# shopping-cart
For an ecommerce website, one of the most important part is product page,
from where user can select products and add them to cart and then proceed to checkout.
Here I have made that functionality.<br>
Before anything you may want to see the demo of this site.It has been deployed on heroku. So please visit the link below to have a look on this project:
<a href="https://sheltered-sierra-67762.herokuapp.com/">shopping-cart</a>
<p>LOGIN CREDENTIALS</p>
<strong>email: test@mobshop.com</strong>
<strong>password: test123</strong>
<p>These login credentials are the one which I am using for testing purposes. But you can create your own account and order the product or products of your choice.</p>
<p>After placing order, you will be redirected to checkout page where you need to enter credit/debit card details for payment.I have used <em>stripe</em> for handing payments and for validating the card credentials. Here since it is currently in development mode hence you are allowed to enter any fake details but make sure that card number should be: <b>4242424242424242</b> which is provided strictly for development and testing purposes from <em>stripe</em>.</p>
<p>You can view all your previous orders on <em>user</em> page.</p>
<p>Also note that your sessions are stored for 12hrs. So after adding the products to cart they will remain stored for 12hrs even if you close the browser. But if you delete the history or cookies  then the session will be deleted.</p>
