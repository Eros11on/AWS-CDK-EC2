import * as cdk from "@aws-cdk-lib";
import * as ec2 from "@aws-cdk/aws-ec2";
import { Construct } from "constructs";
//import * as sqs from "aws-cdk-lib/aws-sqs";

export class DemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const vpc = new ec2.Vpc(this, "VPC", {
      maxAzs: 3,
      natGateways: 1,
      cidr: "10.0.0.0/16",
      subnetConfiguration: [
        {
          name: "Ingress",
          cidrMask: 24,
          subnetType: ec2.SubnetType.PUBLIC,
        },
        {
          cidrMask: 24,
          name: "Application",
          subnetType: ec2.SubnetType.PRIVATE,
        },
        {
          cidrMask: 28,
          name: "Database",
          subnetType: ec2.SubnetType.ISOLATED,
        },
      ],
    });

    new cdk.CfnOutput(this, "Region", { value: this.region });
    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'DemoQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
