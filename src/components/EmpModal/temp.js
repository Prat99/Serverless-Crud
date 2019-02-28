exports.handler = (event, context, callback) => {
    if (event.userPoolId === "ap-southeast-1_Ot95B5rrj") {
        // Identify why was this function invoked
        if (event.triggerSource === "CustomMessage_SignUp") {
            // Ensure that your message contains event.request.codeParameter. This is the placeholder for code that will be sent
            //event.response.smsMessage = "Welcome to the service. Your confirmation code is " + event.request.codeParameter;
            event.response.emailSubject = "Welcome to Smart Selangor Portal";
            // event.response.emailMessage = "<html><h1>vsdjl</h1></html>Hello Thank you for <a href='http://3.0.230.223/account-activate?email="+event.userName+"'> signing up."+event.request.codeParameter+" is your verification code";
            event.response.emailMessage = `<html><body><div style='max-width: 100%;margin: 0 auto; width: 60%;'>
          <div style='background-color:#2c82c9;
          color:#ffffff;
          border-bottom:0;
          font-weight:bold;
          line-height:100%;
          vertical-align:middle;
          font-family:Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;
          border-radius:3px 3px 0 0;' ><div style='padding:36px 48px;display:block;position:relative;'>
          <div style='display: inline-block; width: 75%; vertical-align: middle' >
            <h1 style='padding-right:0px; color:#ffffff;font-family:Helvetica Neue,Helvetica,Roboto,
            Arial,sans-serif;font-size:30px;font-weight:300;line-height:150%;margin:0;text-align:left'>
            Welcome to Smart Selangor Portal</h1>
          </div>
          <div style='display: inline-block; width: 20%; margin-left:2%' >
            <img src='http://3.0.230.223/ssdpPortal/wp-content/uploads/2019/01/Smart_Selangor_Logo_Vertical.png'alt='Smart Selangor Portal' 
            style='border:none;
            font-size:14px;
            font-weight:bold;
            height:auto;
            outline:none;
            text-decoration:none;
            text-transform:capitalize;
            vertical-align:middle;
            margin-right:0px;
            width:100px;
            '>
          </div>
            </div>
        </div>
        <div>
            <div id='m_-3830013711423516082m_6989784878316120291body_content_inner' 
            style='padding: 45px 40px 5px 45px;; color:#636363;font-family:Helvetica Neue,Helvetica,Roboto,
            Arial,sans-serif;font-size:14px;line-height:150%;text-align:left'>
                <p style='margin:0 0 16px'>Hi, ${event.userName}</p>
                <p style='margin:0 0 16px'>Thanks for creating an
                    account on Smart Selangor Portal.
                    Your username is <b><a>${event.userName}</a></b>
                    You can access your account area to view
                    orders, change your password, and more at: <a href="http://uat.smartselangor.com.my/account-activate/?email=${event.userName}"
                        style='color:#2c82c9;font-weight:normal;text-decoration:underline' target='_blank'>http://ssdpcms.com/account-activate/</a></p>
                        <p>Your verification code is ${event.request.codeParameter}</p>
                <p style='margin:0 0 16px'>We look forward to
                    seeing you soon.</p>
            </div>
        </div>
        <div>
            <div colspan='2' style='padding:0 48px 48px 45px;border:0;color:#2c82c9;font-family:Arial;font-size:12px;line-height:125%;text-align:justify;font-weight:bold'
                valign='middle'>
                <p>Smart Selangor Portal</p>
            </div>
               </div>
            </div>
        </body>
        </html>`
    }
        if (event.triggerSource === "CustomMessage_ForgotPassword") {
            console.log('inside forgot password');
            var mysql = require('mysql');
            const config = require('./config');
            var pool = mysql.createPool({
                connectionLimit: config.connectionLimit,
                host: config.host,
                user: config.user,
                password: config.password,
                database: config.database
            });
            context.callbackWaitsForEmptyEventLoop = false;
            pool.getConnection(function (err, connection) {
                if (err) throw err;

                // Use the connection
                connection.query('SELECT *  FROM pbt', function (error, results, fields) {
                    // When done with the connection, release it.
                    connection.release();

                    // Handle error after the release.
                    if (error) callback(error);
                    else {
                        console.log('pbt name', results[0].pbt_name);
                        event.response.emailSubject = `Forget password for ${results[0].pbt_name}`;
                        event.response.emailMessage = "<html><h1>vsdjl</h1> <a href='http://uat.smartselangor.com.my/my-account/lost-password/?show-reset-form=true&email=" + event.userName + "'>reset password</a></html>Hello confirmation code." + event.request.codeParameter + "is" + event.UserContextData + " your verification code";
                        //   callback(null, results[0].pbt_name);
                    }

                    // Don't use the connection here, it has been returned to the pool.
                });
            });
            // Ensure that your message contains event.request.codeParameter. This is the placeholder for code that will be sent
            //event.response.smsMessage = "Welcome to the service. Your confirmation code is " + event.request.codeParameter;

        }
        
    } // user poolid if ends here

    // Customize messages for other user pools

    // Return to Amazon Cognito
    callback(null, event);
};