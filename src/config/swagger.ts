// src/config/swagger.ts
import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Real Estate API',
      version: '1.0.0',
      description: 'Express + TypeScript API with Swagger for Real Estate Management',
    },
    servers: [
      {
        url: 'http://localhost:8000',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        // User Schema
        User: {
          type: 'object',
          required: ['fullName', 'email', 'phone', 'password'],
          properties: {
            _id: {
              type: 'string',
              description: 'User ID',
            },
            fullName: {
              type: 'string',
              description: 'Full name of the user',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
            },
            phone: {
              type: 'string',
              description: 'User phone number',
            },
            password: {
              type: 'string',
              format: 'password',
              description: 'User password (hashed)',
            },
            role: {
              type: 'string',
              enum: ['ADMIN', 'CUSTOMER'],
              default: 'BUYER',
              description: 'User role',
            },
            isVerified: {
              type: 'boolean',
              default: false,
              description: 'Email verification status',
            },
            emailVerificationToken: {
              type: 'string',
              description: 'Token for email verification',
            },
            emailVerificationExpires: {
              type: 'string',
              format: 'date-time',
              description: 'Expiration date for email verification token',
            },
            resetPasswordToken: {
              type: 'string',
              description: 'Token for password reset',
            },
            resetPasswordExpires: {
              type: 'string',
              format: 'date-time',
              description: 'Expiration date for password reset token',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },

        // Property Schema
        Property: {
          type: 'object',
          required: [
            'title',
            'description',
            'purpose',
            'propertyType',
            'price',
            'area',
            'city',
            'areaName',
            'municipality',
            'wardNo',
            'slug',
          ],
          properties: {
            _id: {
              type: 'string',
              description: 'Property ID',
            },
            title: {
              type: 'string',
              description: 'Property title',
            },
            description: {
              type: 'string',
              description: 'Property description',
            },
            purpose: {
              type: 'string',
              enum: ['SALE', 'RENT'],
              description: 'Property purpose',
            },
            propertyType: {
              type: 'string',
              enum: ['RESIDENTIAL', 'COMMERCIAL', 'LAND'],
              description: 'Type of property',
            },
            price: {
              type: 'number',
              description: 'Property price in NPR',
            },
            negotiable: {
              type: 'boolean',
              default: false,
              description: 'Whether price is negotiable',
            },
            area: {
              type: 'object',
              required: ['value', 'unit'],
              properties: {
                value: {
                  type: 'number',
                  description: 'Area value',
                },
                unit: {
                  type: 'string',
                  enum: ['AANA', 'ROPANI', 'KATHA', 'DHUR'],
                  description: 'Area unit',
                },
              },
            },
            city: {
              type: 'string',
              description: 'City name',
            },
            areaName: {
              type: 'string',
              description: 'Area/locality name',
            },
            municipality: {
              type: 'string',
              description: 'Municipality name',
            },
            wardNo: {
              type: 'number',
              description: 'Ward number',
            },
            roadType: {
              type: 'string',
              enum: ['BLACKTOPPED', 'GRAVEL', 'EARTH'],
              description: 'Type of road',
            },
            roadAccess: {
              type: 'number',
              description: 'Road access in feet',
            },
            ringRoadDistance: {
              type: 'number',
              description: 'Distance from ring road in km',
            },
            propertyFace: {
              type: 'string',
              enum: [
                'NORTH',
                'SOUTH',
                'EAST',
                'WEST',
                'NORTH_EAST',
                'NORTH_WEST',
                'SOUTH_EAST',
                'SOUTH_WEST',
              ],
              description: 'Property facing direction',
            },
            images: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Array of image URLs',
            },
            // documents: {
            //   type: 'object',
            //   properties: {
            //     lalpurja: {
            //       type: 'string',
            //       description: 'Lalpurja document URL',
            //     },
            //     traceMap: {
            //       type: 'string',
            //       description: 'Trace map document URL',
            //     },
            //   },
            // },
            status: {
              type: 'string',
              enum: ['AVAILABLE', 'SOLD', 'RESERVED'],
              default: 'AVAILABLE',
              description: 'Property status',
            },
            datePosted: {
              type: 'string',
              format: 'date-time',
              description: 'Date when property was posted',
            },
            isVerified: {
              type: 'boolean',
              default: false,
              description: 'Verification status',
            },
            slug: {
              type: 'string',
              description: 'URL-friendly slug',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },

        // Location Schema
        Location: {
          type: 'object',
          required: ['province', 'district', 'municipality', 'ward'],
          properties: {
            _id: {
              type: 'string',
              description: 'Location ID',
            },
            province: {
              type: 'string',
              description: 'Province name',
            },
            district: {
              type: 'string',
              description: 'District name',
            },
            municipality: {
              type: 'string',
              description: 'Municipality name',
            },
            ward: {
              type: 'number',
              description: 'Ward number',
            },
            street: {
              type: 'string',
              description: 'Street name',
            },
          },
        },

        // Favorite Schema
        Favorite: {
          type: 'object',
          required: ['user', 'property'],
          properties: {
            _id: {
              type: 'string',
              description: 'Favorite ID',
            },
            user: {
              type: 'string',
              description: 'User ID reference',
            },
            property: {
              type: 'string',
              description: 'Property ID reference',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },

        // Inquiry Schema
        Inquiry: {
          type: 'object',
          required: ['property', 'name', 'email', 'message'],
          properties: {
            _id: {
              type: 'string',
              description: 'Inquiry ID',
            },
            property: {
              type: 'string',
              description: 'Property ID reference',
            },
            name: {
              type: 'string',
              description: 'Inquirer name',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Inquirer email',
            },
            phone: {
              type: 'string',
              description: 'Inquirer phone number',
            },
            message: {
              type: 'string',
              description: 'Inquiry message',
            },
            status: {
              type: 'string',
              enum: ['NEW', 'CONTACTED', 'CLOSED'],
              default: 'NEW',
              description: 'Inquiry status',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },

        // Review Schema
        Review: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Review ID',
            },
            property: {
              type: 'string',
              description: 'Property ID reference',
            },
            user: {
              type: 'string',
              description: 'User ID reference',
            },
            rating: {
              type: 'number',
              minimum: 1,
              maximum: 5,
              description: 'Rating from 1 to 5',
            },
            comment: {
              type: 'string',
              description: 'Review comment',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },

        Blog: {
  type: "object",
  properties: {
    _id: { type: "string" },
    title: { type: "string" },
    slug: { type: "string" },
    content: { type: "string" },
    author: { type: "string" },
    image: { type: "string" },
    isPublished: { type: "boolean" },
    createdAt: { type: "string", format: "date-time" },
  },
},
FAQ: {
  type: "object",
  properties: {
    _id: { type: "string" },
    question: { type: "string" },
    answer: { type: "string" },
    isActive: { type: "boolean" },
    createdAt: { type: "string", format: "date-time" },
  },
},
        // Error Response Schema
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false,
            },
            message: {
              type: 'string',
              description: 'Error message',
            },
            error: {
              type: 'string',
              description: 'Detailed error information',
            },
          },
        },

        // Success Response Schema
        Success: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            message: {
              type: 'string',
              description: 'Success message',
            },
            data: {
              type: 'object',
              description: 'Response data',
            },
          },
        },
      },
    },
  },
  apis: ['src/routes/*.ts', 'src/dto/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);