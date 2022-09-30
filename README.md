# xml2json

## Description
The xml2json repository has a single lambda to take XML and return JSON

This repo is failover ready VIA DNS

The repository contains:
* An API Gateway for communicating with the function
* A lambda & associated permissions connected to the api gateway

## Deployment
### Initial Deployment
* Create a bucket named in the following format in each deployment region `SHERPA_NAME-deployment-bucket-AWS_REGION`
* Create a SSM parameter with the alias `/xml2json/apikey` as a SecureString and generate an API key
* Follow the steps in the all deployments section

### All Deployments
* Create a zip of the src and upload it to the deployment buckets including the version number. The zip should be named as follows: `xml2json-VERSION.zip`
  * `npm run zip` will automatically append the current package.json version to the zip created
  * Please be good souls and bump the version if you are actively working on this. A previous .zip file will allow us rollback if we ever need too.
* In each deployment region use the update stack (create if doing for the first time) behaviour and create/update the stack named `xml2json`
* The stack parameters should be filled in as follows:
  * Version: The version number of the service that matches the zip in the deployment bucket
  * ApiKeySSMParameter: The SSM parameter containing the API key.
  * SherpaName: The name of the sherpa (this is usually the organization name but the parameter is not called organization as sherpas can contain multiple organizations)
  * AcmCertArn: The ARN of the ACM certificate to use
  * CustomDomainName: The custom domain name associated with the ACM certificate to be used


## API
### XML 2 JSON

| Summary | |
| - | - |
| Description | Converts XML to JSON |
| Endpoint | `/v1/xml2json` |
| Verb | POST |

#### Request Headers

| Key | Value |
| - | - |
| Content-Type | application/json |
| Authorization | ApiKey {some-api-key} |

#### Request Body

```json
{
  "xml":"<note><to>Tove</to><from>Jani</from><heading>Reminder</heading><body>Don't forget me this weekend!</body></note>"
}
```

#### Response Headers

| Key | Value |
| - | - |
| Content-Type | application/json |

#### Responses

| Status Code | Description |
| - | - |
| 200 | Success - Successfully converted the XML to JSON |
| 400 | Invalid request -  Body will contain a descriptive error message. |
| 500 | Internal Server Error. |

#### Response Body
```json
{
    "json": {
        "note": {
            "to": [
                "Tove"
            ],
            "from": [
                "Jani"
            ],
            "heading": [
                "Reminder"
            ],
            "body": [
                "Don't forget me this weekend!"
            ]
        }
    }
}
```




