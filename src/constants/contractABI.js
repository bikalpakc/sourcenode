export const contractABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "uniqueId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "string",
        name: "ideaTitle",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "currentStage",
        type: "string",
      },
    ],
    name: "IdeaSubmissionDetails",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "uniqueId",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "submittor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "IdeaSubmissionInitiated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_ideaOwner",
        type: "string",
      },
      {
        internalType: "string",
        name: "_contactEmail",
        type: "string",
      },
      {
        internalType: "string",
        name: "_ideaTitle",
        type: "string",
      },
      {
        internalType: "string",
        name: "_ideaDescription",
        type: "string",
      },
      {
        internalType: "string",
        name: "_ideaCategory",
        type: "string",
      },
      {
        internalType: "string",
        name: "_proofOfConcept",
        type: "string",
      },
      {
        internalType: "string[]",
        name: "_supportingDocuments",
        type: "string[]",
      },
      {
        internalType: "string",
        name: "_expectedOutcome",
        type: "string",
      },
      {
        internalType: "string",
        name: "_currentStage",
        type: "string",
      },
      {
        internalType: "string[]",
        name: "_contributors",
        type: "string[]",
      },
    ],
    name: "submitIdea",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllIdeasSummary",
    outputs: [
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "bytes32[]",
        name: "uniqueIds",
        type: "bytes32[]",
      },
      {
        internalType: "string[]",
        name: "ideaOwners",
        type: "string[]",
      },
      {
        internalType: "string[]",
        name: "ideaTitles",
        type: "string[]",
      },
      {
        internalType: "string[]",
        name: "ideaDescriptions",
        type: "string[]",
      },
      {
        internalType: "uint256[]",
        name: "timestamps",
        type: "uint256[]",
      },
      {
        internalType: "string[]",
        name: "currentStages",
        type: "string[]",
      },
      {
        internalType: "address[]",
        name: "submittors",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_uniqueId",
        type: "bytes32",
      },
    ],
    name: "getIdeaByUniqueId",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "ideaOwner",
            type: "string",
          },
          {
            internalType: "string",
            name: "contactEmail",
            type: "string",
          },
          {
            internalType: "string",
            name: "ideaTitle",
            type: "string",
          },
          {
            internalType: "string",
            name: "ideaDescription",
            type: "string",
          },
          {
            internalType: "string",
            name: "ideaCategory",
            type: "string",
          },
        ],
        internalType: "struct IdeaStorage.IdeaMetadata",
        name: "metadata",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "string",
            name: "proofOfConcept",
            type: "string",
          },
          {
            internalType: "string[]",
            name: "supportingDocuments",
            type: "string[]",
          },
          {
            internalType: "string",
            name: "expectedOutcome",
            type: "string",
          },
          {
            internalType: "string",
            name: "currentStage",
            type: "string",
          },
          {
            internalType: "string[]",
            name: "contributors",
            type: "string[]",
          },
        ],
        internalType: "struct IdeaStorage.IdeaDetails",
        name: "details",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "submittor",
            type: "address",
          },
          {
            internalType: "bytes32",
            name: "uniqueId",
            type: "bytes32",
          },
        ],
        internalType: "struct IdeaStorage.IdeaSubmissionInfo",
        name: "submissionInfo",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
