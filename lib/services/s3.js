"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecureBucket = void 0;
const aws_s3_1 = require("@aws-cdk/aws-s3");
const utils_1 = require("./../utils");
var BucketSecurityWarnings;
(function (BucketSecurityWarnings) {
    BucketSecurityWarnings["SSLIsNotEnforced"] = "SSL in S3 Bucket is not enforced.";
    BucketSecurityWarnings["PublicReadAccessEnabled"] = "Contents of the S3 Bucket are publicly accessible.";
    BucketSecurityWarnings["BucketIsNotEncrypted"] = "S3 Bucket is not encrypted.";
})(BucketSecurityWarnings || (BucketSecurityWarnings = {}));
class SecureBucket extends aws_s3_1.Bucket {
    constructor(scope, id, props) {
        utils_1.warnIfEquals(props === null || props === void 0 ? void 0 : props.enforceSSL, false, BucketSecurityWarnings.SSLIsNotEnforced);
        utils_1.warnIfEquals(props === null || props === void 0 ? void 0 : props.publicReadAccess, true, BucketSecurityWarnings.PublicReadAccessEnabled);
        utils_1.warnIfEquals(props === null || props === void 0 ? void 0 : props.encryption, aws_s3_1.BucketEncryption.UNENCRYPTED, BucketSecurityWarnings.BucketIsNotEncrypted);
        super(scope, id, {
            enforceSSL: true,
            publicReadAccess: false,
            encryption: aws_s3_1.BucketEncryption.S3_MANAGED,
            ...props
        });
    }
}
exports.SecureBucket = SecureBucket;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiczMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzMy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw0Q0FBd0U7QUFHeEUsc0NBQTBDO0FBRTFDLElBQUssc0JBSUo7QUFKRCxXQUFLLHNCQUFzQjtJQUN6QixnRkFBc0QsQ0FBQTtJQUN0RCx3R0FBOEUsQ0FBQTtJQUM5RSw4RUFBb0QsQ0FBQTtBQUN0RCxDQUFDLEVBSkksc0JBQXNCLEtBQXRCLHNCQUFzQixRQUkxQjtBQUVELE1BQWEsWUFBYSxTQUFRLGVBQU07SUFDdEMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFtQjtRQUMzRCxvQkFBWSxDQUFDLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLHNCQUFzQixDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDaEYsb0JBQVksQ0FBQyxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLHNCQUFzQixDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDNUYsb0JBQVksQ0FBQyxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsVUFBVSxFQUFFLHlCQUFnQixDQUFDLFdBQVcsRUFBRSxzQkFBc0IsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBRTNHLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFO1lBQ2YsVUFBVSxFQUFFLElBQUk7WUFDaEIsZ0JBQWdCLEVBQUUsS0FBSztZQUN2QixVQUFVLEVBQUUseUJBQWdCLENBQUMsVUFBVTtZQUN2QyxHQUFHLEtBQUs7U0FDVCxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUFiRCxvQ0FhQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJ1Y2tldCwgQnVja2V0UHJvcHMsIEJ1Y2tldEVuY3J5cHRpb24gfSBmcm9tICdAYXdzLWNkay9hd3MtczMnO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnQGF3cy1jZGsvY29yZSc7XG5cbmltcG9ydCB7IHdhcm5JZkVxdWFscyB9IGZyb20gJy4vLi4vdXRpbHMnO1xuXG5lbnVtIEJ1Y2tldFNlY3VyaXR5V2FybmluZ3Mge1xuICBTU0xJc05vdEVuZm9yY2VkID0gJ1NTTCBpbiBTMyBCdWNrZXQgaXMgbm90IGVuZm9yY2VkLicsXG4gIFB1YmxpY1JlYWRBY2Nlc3NFbmFibGVkID0gJ0NvbnRlbnRzIG9mIHRoZSBTMyBCdWNrZXQgYXJlIHB1YmxpY2x5IGFjY2Vzc2libGUuJyxcbiAgQnVja2V0SXNOb3RFbmNyeXB0ZWQgPSAnUzMgQnVja2V0IGlzIG5vdCBlbmNyeXB0ZWQuJ1xufVxuXG5leHBvcnQgY2xhc3MgU2VjdXJlQnVja2V0IGV4dGVuZHMgQnVja2V0IHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBCdWNrZXRQcm9wcykge1xuICAgIHdhcm5JZkVxdWFscyhwcm9wcz8uZW5mb3JjZVNTTCwgZmFsc2UsIEJ1Y2tldFNlY3VyaXR5V2FybmluZ3MuU1NMSXNOb3RFbmZvcmNlZCk7XG4gICAgd2FybklmRXF1YWxzKHByb3BzPy5wdWJsaWNSZWFkQWNjZXNzLCB0cnVlLCBCdWNrZXRTZWN1cml0eVdhcm5pbmdzLlB1YmxpY1JlYWRBY2Nlc3NFbmFibGVkKTtcbiAgICB3YXJuSWZFcXVhbHMocHJvcHM/LmVuY3J5cHRpb24sIEJ1Y2tldEVuY3J5cHRpb24uVU5FTkNSWVBURUQsIEJ1Y2tldFNlY3VyaXR5V2FybmluZ3MuQnVja2V0SXNOb3RFbmNyeXB0ZWQpO1xuXG4gICAgc3VwZXIoc2NvcGUsIGlkLCB7XG4gICAgICBlbmZvcmNlU1NMOiB0cnVlLFxuICAgICAgcHVibGljUmVhZEFjY2VzczogZmFsc2UsXG4gICAgICBlbmNyeXB0aW9uOiBCdWNrZXRFbmNyeXB0aW9uLlMzX01BTkFHRUQsXG4gICAgICAuLi5wcm9wc1xuICAgIH0pO1xuICB9XG59XG4iXX0=