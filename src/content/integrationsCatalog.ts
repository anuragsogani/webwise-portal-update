/** Cloud ecosystem integrations catalog (Sysdig-style finder). */

export const INTEGRATIONS_PAGE_SIZE = 9;

export const INTEGRATION_TYPE_FILTERS = ["Cloud provider","Container platform","Data lake","Incident management","Monitoring","Registry","Appsec"] as const;
export type IntegrationTypeFilter = (typeof INTEGRATION_TYPE_FILTERS)[number];

export const PLATFORM_FILTERS = ["Amazon","Atlassian","Checkmarx","GitHub","GitLab","Google","HashiCorp","IBM","JFrog","Microsoft","Microsoft Azure","Mirantis","Open Source","Open Source, Red Hat","Oracle","Pagerduty","Red Hat","Servicenow","Splunk","SUSE","Snyk","VMWare"] as const;
export type PlatformFilter = (typeof PLATFORM_FILTERS)[number];

export type IntegrationEntry = {
  readonly id: string;
  readonly category: string;
  readonly platform: string;
  readonly title: string;
  readonly description: string;
  readonly logoUrl: string;
};

export const INTEGRATIONS_SEO = {
  title: "Integrations | Cloud Ecosystem | AiRAT",
  description:
    "Collaboration with industry-leading cloud, container, data, and security platforms. Filter integrations by type and vendor to see how AiRAT fits your stack.",
} as const;

export const INTEGRATIONS_HERO = {
  eyebrow: "Integrations",
  headline: "Cloud Ecosystem Integrations",
  body:
    "Collaboration with industry-leading solutions to strengthen your cloud security operations. Use the finder below to learn more about our integrations.",
} as const;

export const INTEGRATIONS_CATALOG: readonly IntegrationEntry[] = [
  {
    "id": "amazon-cloudwatch",
    "category": "Monitoring",
    "platform": "Amazon",
    "title": "Amazon CloudWatch",
    "description": "AiRAT integrates with Amazon CloudWatch to strengthen monitoring workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/69c5a622cad214885b766c3f_6883cef4667359a1f19ce0d9_logo-amazon-cloudwatch-1350x240-1.webp"
  },
  {
    "id": "amazon-ecs",
    "category": "Cloud provider",
    "platform": "Amazon",
    "title": "Amazon ECS",
    "description": "AiRAT integrates with Amazon ECS to strengthen cloud provider workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/69c5a6b9a8cbaf4b152d7592_6883cf085cbb3c931d82482f_logo-amazon-ecs-885x240-1.webp"
  },
  {
    "id": "amazon-eks",
    "category": "Container platform",
    "platform": "Amazon",
    "title": "Amazon EKS",
    "description": "With AiRAT, Amazon Elastic Kubernetes Service (EKS) users get a single view of risk with no blind spots, no guesswork, no wasted time.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/69c5a6afd404688e07cae282_6883cf1c47463b6211d1980b_amazon-eks-logo.webp"
  },
  {
    "id": "amazon-ecr",
    "category": "Registry",
    "platform": "Amazon",
    "title": "Amazon Elastic Container Registry",
    "description": "AiRAT integrates with Amazon Elastic Container Registry to strengthen registry workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/69c5a6623badd68863f40d7c_6883cf2ff869b071d454dd18_logo-amazon-ecr-885x240-1.webp"
  },
  {
    "id": "amazon-security-lake",
    "category": "Cloud provider",
    "platform": "Amazon",
    "title": "Amazon Security Lake",
    "description": "AiRAT integrates with Amazon Security Lake to strengthen cloud provider workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": ""
  },
  {
    "id": "amazon-sns",
    "category": "Cloud provider",
    "platform": "Amazon",
    "title": "Amazon Simple Notification Service",
    "description": "AiRAT integrates with Amazon Simple Notification Service to strengthen cloud provider workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/69c5a638d8f5e08c99e3728c_6883cf79b575f294c528da16_logo-amazon-sns-1200x240-1.webp"
  },
  {
    "id": "aws",
    "category": "Cloud provider",
    "platform": "Amazon",
    "title": "Amazon Web Services",
    "description": "AiRAT partners with Amazon Web Services (AWS) to deliver cloud and container security powered by runtime insights.",
    "logoUrl": ""
  },
  {
    "id": "anthropic",
    "category": "Cloud provider",
    "platform": "Partner",
    "title": "Anthropic",
    "description": "AiRAT integrates with Anthropic to strengthen cloud provider workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/6a19cfc9d2655507780dea24_Anthropic%20logo%20-%20Slate.svg"
  },
  {
    "id": "bamboo",
    "category": "Cloud provider",
    "platform": "Partner",
    "title": "Atlassian Bamboo",
    "description": "AiRAT integrates with Atlassian Bamboo to strengthen cloud provider workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/69c5a644d6b5c38c9e0e6a7a_68827e973945cd2196181fea_logo-atlassian-bamboo-1131x240-1-768x139.webp"
  },
  {
    "id": "aws-bottlerocket",
    "category": "Cloud provider",
    "platform": "Amazon",
    "title": "AWS Bottlerocket",
    "description": "AiRAT integrates with AWS Bottlerocket to strengthen cloud provider workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/69c5a6147419173d36a546f9_6883ce6a4109da5fc77db785_logo-aws-bottlerocket-1350x240-1-768x137.png"
  },
  {
    "id": "aws-cloudtrail",
    "category": "Cloud provider",
    "platform": "Amazon",
    "title": "AWS CloudTrail",
    "description": "AiRAT integrates with AWS CloudTrail to strengthen cloud provider workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/69c5a64cd404688e07cac59c_6883ce8a8c4c67f20d3a2827_logo-amazon-cloudtrail-1350x240-1.png"
  },
  {
    "id": "aws-codepipeline-codebuild",
    "category": "Cloud provider",
    "platform": "Amazon",
    "title": "AWS CodePipeline &amp; Codebuild",
    "description": "AiRAT integrates with AWS CodePipeline &amp; Codebuild to strengthen cloud provider workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/69c5a64a6dc03f20977eed17_6883ce9efe64e7693bfba28c_logo-aws-codebuild-1024x240-1.webp"
  },
  {
    "id": "aws-fargate",
    "category": "Cloud provider",
    "platform": "Amazon",
    "title": "AWS Fargate",
    "description": "AiRAT integrates with AWS Fargate to strengthen cloud provider workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": ""
  },
  {
    "id": "aws-lambda",
    "category": "Cloud provider",
    "platform": "Amazon",
    "title": "AWS Lambda",
    "description": "AiRAT integrates with AWS Lambda to strengthen cloud provider workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/69c5a69f7be135a748d16690_6883cec52622eb9b834aa401_logo-aws-lambda-969x240-1.webp"
  },
  {
    "id": "aws-outposts",
    "category": "Cloud provider",
    "platform": "Amazon",
    "title": "AWS Outposts",
    "description": "AiRAT integrates with AWS Outposts to strengthen cloud provider workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/68efc1a43792468c11d7243a_logo-aws-outposts-1350x240-1.png"
  },
  {
    "id": "backstage",
    "category": "Cloud provider",
    "platform": "Partner",
    "title": "Backstage",
    "description": "AiRAT integrates with Backstage to strengthen cloud provider workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/6883cfa0ad482d810afcd2c3_backstage-logo.svg"
  },
  {
    "id": "chainguard",
    "category": "Cloud provider",
    "platform": "Partner",
    "title": "Chainguard",
    "description": "AiRAT integrates with Chainguard to strengthen cloud provider workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/68827f62504d0e892ac643d8_Chainguard-Logo-Blue.svg"
  },
  {
    "id": "checkmarx",
    "category": "Appsec",
    "platform": "Partner",
    "title": "Checkmarx",
    "description": "AiRAT integrates with Checkmarx to strengthen appsec workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/69c5a68b74c0f050926b1870_6883cfc18f2da49c5c7e73fb_tapp-new-logo-checkmarx.webp"
  },
  {
    "id": "circleci",
    "category": "Cloud provider",
    "platform": "Partner",
    "title": "CircleCI",
    "description": "AiRAT integrates with CircleCI to strengthen cloud provider workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/69c5a648620b124ab25d13f0_68827f7d2d8f50832efe2df3_logo-circleci-1148x240-1-768x161.webp"
  },
  {
    "id": "consul",
    "category": "Cloud provider",
    "platform": "Partner",
    "title": "Consul",
    "description": "AiRAT integrates with Consul to strengthen cloud provider workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": ""
  },
  {
    "id": "cribl",
    "category": "Cloud provider",
    "platform": "Partner",
    "title": "Cribl",
    "description": "AiRAT integrates with Cribl to strengthen cloud provider workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/69c5a67fee14b8a9bd7a5b57_68827fa7208f0c83ecb5a625_Cribl-logo-350x94.png"
  },
  {
    "id": "cybereason",
    "category": "Cloud provider",
    "platform": "Partner",
    "title": "Cybereason XDR",
    "description": "AiRAT integrates with Cybereason XDR to strengthen cloud provider workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/69c5a66d460b2537a86147fa_6882800692e6bdbf8da37c13_tapp-logo-cybereason-black.webp"
  },
  {
    "id": "cycode",
    "category": "Cloud provider",
    "platform": "Partner",
    "title": "Cycode",
    "description": "AiRAT integrates with Cycode to strengthen cloud provider workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": ""
  },
  {
    "id": "d2iq",
    "category": "Cloud provider",
    "platform": "Partner",
    "title": "D2IQ",
    "description": "AiRAT integrates with D2IQ to strengthen cloud provider workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/69c5a6167b792e58c3b96028_68828035701fca3e3343ff3b_d2iq-logo.webp"
  },
  {
    "id": "docker-scout",
    "category": "Cloud provider",
    "platform": "Partner",
    "title": "Docker Scout",
    "description": "AiRAT integrates with Docker Scout to strengthen cloud provider workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/6903c5a6e4b3f88d446dc7ed_68769cdcdefd123af4b999c8_Docker-scout-logo.webp"
  },
  {
    "id": "docker-trusted-registry",
    "category": "Registry",
    "platform": "Partner",
    "title": "Docker Trusted Registry",
    "description": "AiRAT integrates with Docker Trusted Registry to strengthen registry workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/6903c5a6e4b3f88d446dc7f6_68769aa02906ef1bb73f3480_logo-docker-646x166-1.webp"
  },
  {
    "id": "elasticsearch",
    "category": "Cloud provider",
    "platform": "Partner",
    "title": "Elasticsearch",
    "description": "AiRAT integrates with Elasticsearch to strengthen cloud provider workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": ""
  },
  {
    "id": "github",
    "category": "Appsec",
    "platform": "Partner",
    "title": "GitHub",
    "description": "AiRAT integrates with GitHub to strengthen appsec workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/69c5a6426dc03f20977ee6a6_688282225443410d6178abd6_logo-github2-1-350x98.png"
  },
  {
    "id": "gitlab",
    "category": "Appsec",
    "platform": "Partner",
    "title": "GitLab",
    "description": "AiRAT integrates with GitLab to strengthen appsec workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/69c5a6406409df83d7c9df9b_6882823a511a915dcb669bc6_logo-gitlab-cicd-229x240-1-1-350x133.webp"
  },
  {
    "id": "go",
    "category": "Cloud provider",
    "platform": "Partner",
    "title": "GO",
    "description": "AiRAT integrates with GO to strengthen cloud provider workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/69c5a612bbec63cfe395a1d7_6882820b1d58f5aa47ee90db_logo-go-641x240-1-350x131.png"
  },
  {
    "id": "google-cloud-platform",
    "category": "Cloud provider",
    "platform": "Google",
    "title": "Google Cloud",
    "description": "Detect and respond to threats across your Google Cloud services, GKE, and containers with AiRAT.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/6903c5a77c158eec95c5c590_6876920962e9b323fbc461a3_logo-google-cloud-402x70-1-350x62.webp"
  },
  {
    "id": "google-cloud-anthos",
    "category": "Cloud provider",
    "platform": "Google",
    "title": "Google Cloud Anthos",
    "description": "AiRAT integrates with Google Cloud Anthos to strengthen cloud provider workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/6903c5a77c158eec95c5c590_6876920962e9b323fbc461a3_logo-google-cloud-402x70-1-350x62.webp"
  },
  {
    "id": "artifact-registry",
    "category": "Registry",
    "platform": "Partner",
    "title": "Google Cloud Artifact Registry",
    "description": "AiRAT integrates with Google Cloud Artifact Registry to strengthen registry workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/6903c5a77c158eec95c5c590_6876920962e9b323fbc461a3_logo-google-cloud-402x70-1-350x62.webp"
  },
  {
    "id": "google-cloud-build",
    "category": "Cloud provider",
    "platform": "Google",
    "title": "Google Cloud Build",
    "description": "AiRAT integrates with Google Cloud Build to strengthen cloud provider workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/6903c5a77c158eec95c5c590_6876920962e9b323fbc461a3_logo-google-cloud-402x70-1-350x62.webp"
  },
  {
    "id": "google-cloud-kubernetes-engine",
    "category": "Container platform",
    "platform": "Google",
    "title": "Google Cloud Kubernetes Engine",
    "description": "With AiRAT, Google Kubernetes Engine (GKE) users get a single view of risk with no blind spots, no guesswork, no wasted time.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/6903c5a77c158eec95c5c590_6876920962e9b323fbc461a3_logo-google-cloud-402x70-1-350x62.webp"
  },
  {
    "id": "google-cloud-registry-gcr",
    "category": "Registry",
    "platform": "Google",
    "title": "Google Cloud Registry (GCR)",
    "description": "AiRAT integrates with Google Cloud Registry (GCR) to strengthen registry workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/6903c5a77c158eec95c5c590_6876920962e9b323fbc461a3_logo-google-cloud-402x70-1-350x62.webp"
  },
  {
    "id": "google-cloud-run",
    "category": "Cloud provider",
    "platform": "Google",
    "title": "Google Cloud Run",
    "description": "AiRAT integrates with Google Cloud Run to strengthen cloud provider workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/6903c5a77c158eec95c5c590_6876920962e9b323fbc461a3_logo-google-cloud-402x70-1-350x62.webp"
  },
  {
    "id": "google-cloud-security-command-center",
    "category": "Cloud provider",
    "platform": "Google",
    "title": "Google Cloud Security Command Center",
    "description": "AiRAT integrates with Google Cloud Security Command Center to strengthen cloud provider workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/6903c5a77c158eec95c5c590_6876920962e9b323fbc461a3_logo-google-cloud-402x70-1-350x62.webp"
  },
  {
    "id": "google-cos",
    "category": "Cloud provider",
    "platform": "Google",
    "title": "Google COS",
    "description": "AiRAT integrates with Google COS to strengthen cloud provider workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/6903c5a77c158eec95c5c590_6876920962e9b323fbc461a3_logo-google-cloud-402x70-1-350x62.webp"
  },
  {
    "id": "google-cloud-chronicle",
    "category": "Cloud provider",
    "platform": "Google",
    "title": "Google SecOps (formerly Chronicle)",
    "description": "AiRAT integrates with Google SecOps (formerly Chronicle) to strengthen cloud provider workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/6903c5a77c158eec95c5c590_6876920962e9b323fbc461a3_logo-google-cloud-402x70-1-350x62.webp"
  },
  {
    "id": "harbor",
    "category": "Registry",
    "platform": "Partner",
    "title": "Harbor",
    "description": "AiRAT integrates with Harbor to strengthen registry workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": ""
  },
  {
    "id": "hashicorp",
    "category": "Cloud provider",
    "platform": "Partner",
    "title": "HashiCorp",
    "description": "AiRAT integrates with HashiCorp to strengthen cloud provider workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/69c5a665cd4631aad6653e66_68829bb7ccdb8cb2dc0ad685_logo-hashicorp-black-175x39.png"
  },
  {
    "id": "helm",
    "category": "Cloud provider",
    "platform": "Partner",
    "title": "Helm",
    "description": "AiRAT integrates with Helm to strengthen cloud provider workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": ""
  },
  {
    "id": "ibm-cloud",
    "category": "Cloud provider",
    "platform": "IBM",
    "title": "IBM Cloud",
    "description": "IBM Cloud enables rapid delivery of applications on containers with Kubernetes - AiRAT simplifies cluster security, scale, and lifecycle management.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/6903c5a72891a3df77487c85_687695d7ee051371c45e4d2b_IBM_Cloud_Logo.png"
  },
  {
    "id": "ibm-cloud-monitoring",
    "category": "Monitoring",
    "platform": "IBM",
    "title": "IBM Cloud Monitoring",
    "description": "AiRAT integrates with IBM Cloud Monitoring to strengthen monitoring workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/6903c5a72891a3df77487c85_687695d7ee051371c45e4d2b_IBM_Cloud_Logo.png"
  },
  {
    "id": "ibm-red-hat-openshift-kubernetes-service",
    "category": "Container platform",
    "platform": "IBM",
    "title": "IBM Cloud Red Hat OpenShift Kubernetes Service (ROKS)",
    "description": "AiRAT integrates with IBM Cloud Red Hat OpenShift Kubernetes Service (ROKS) to strengthen container platform workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/6903c5a72891a3df77487c85_687695d7ee051371c45e4d2b_IBM_Cloud_Logo.png"
  },
  {
    "id": "ibm-cloud-scc-workload-protection",
    "category": "Cloud provider",
    "platform": "IBM",
    "title": "IBM Cloud Security and Compliance Center Workload Protection",
    "description": "AiRAT integrates with IBM Cloud Security and Compliance Center Workload Protection to strengthen cloud provider workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/6903c5a72891a3df77487c85_687695d7ee051371c45e4d2b_IBM_Cloud_Logo.png"
  },
  {
    "id": "ibm-cloud-kubernetes-service",
    "category": "Container platform",
    "platform": "IBM",
    "title": "IBM Kubernetes Service",
    "description": "AiRAT integrates with IBM Kubernetes Service to strengthen container platform workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/69c5a6ab72fdbf0c18f87c0d_6883d39a64d533e00010acac_logo-ibm-cloud-kubernetes-service-1280x240-1-1.webp"
  },
  {
    "id": "qradar",
    "category": "Cloud provider",
    "platform": "Partner",
    "title": "IBM QRadar SIEM",
    "description": "AiRAT integrates with IBM QRadar SIEM to strengthen cloud provider workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/6903c5a72891a3df77487c85_687695d7ee051371c45e4d2b_IBM_Cloud_Logo.png"
  },
  {
    "id": "java",
    "category": "Cloud provider",
    "platform": "Partner",
    "title": "Java",
    "description": "AiRAT integrates with Java to strengthen cloud provider workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/69c5a60ebbec63cfe3959fae_68829070527567988491c0e4_logo-java-thumbnail.webp"
  },
  {
    "id": "jenkins",
    "category": "Cloud provider",
    "platform": "Partner",
    "title": "Jenkins",
    "description": "AiRAT integrates with Jenkins to strengthen cloud provider workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/69c5a63e3badd68863f406ae_6882908ee57477a6174e2e28_logo-jenkins-776x240-1-350x108.png"
  },
  {
    "id": "jfrog-artifactory",
    "category": "Registry",
    "platform": "Partner",
    "title": "JFrog Artifactory",
    "description": "AiRAT integrates with JFrog Artifactory to strengthen registry workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/69c5a66b73d9f167d1c76dc5_6882903f2738f85c85b3d6f3_logo-jfrog-artifactory-885x240-1-175x47.png"
  },
  {
    "id": "kasten",
    "category": "Cloud provider",
    "platform": "Partner",
    "title": "Kasten",
    "description": "AiRAT integrates with Kasten to strengthen cloud provider workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/69c5a635d6b5c38c9e0e64af_688290ab45df1ace2d234474_logo-kasten-175x66.png"
  },
  {
    "id": "knative",
    "category": "Cloud provider",
    "platform": "Partner",
    "title": "Knative",
    "description": "AiRAT integrates with Knative to strengthen cloud provider workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/69c5a61ada748794f8eb7ac7_688290d7e85a7f5fe461a9d4_knative-logo-175x60.png"
  },
  {
    "id": "kubernetes",
    "category": "Container platform",
    "platform": "Partner",
    "title": "Kubernetes",
    "description": "AiRAT integrates with Kubernetes to strengthen container platform workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": ""
  },
  {
    "id": "kustomize",
    "category": "Cloud provider",
    "platform": "Partner",
    "title": "Kustomize.io",
    "description": "AiRAT integrates with Kustomize.io to strengthen cloud provider workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": ""
  },
  {
    "id": "mend-io",
    "category": "Cloud provider",
    "platform": "Partner",
    "title": "Mend.io",
    "description": "AiRAT integrates with Mend.io to strengthen cloud provider workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": ""
  },
  {
    "id": "azure",
    "category": "Cloud provider",
    "platform": "Microsoft Azure",
    "title": "Microsoft Azure",
    "description": "Detect and respond to threats across your Azure cloud services, AKS, and containers with AiRAT.",
    "logoUrl": ""
  },
  {
    "id": "microsoft-azure-container-apps",
    "category": "Cloud provider",
    "platform": "Microsoft Azure",
    "title": "Microsoft Azure Container Apps",
    "description": "AiRAT integrates with Microsoft Azure Container Apps to strengthen cloud provider workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": ""
  },
  {
    "id": "microsoft-azure-container-registry-acr",
    "category": "Registry",
    "platform": "Microsoft Azure",
    "title": "Microsoft Azure Container Registry",
    "description": "AiRAT integrates with Microsoft Azure Container Registry to strengthen registry workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/69c5a65b6dc03f20977ef7e8_6883d41261deae1562e0c63d_logo-microsoft-azure-container-registry-1280x240-1.webp"
  },
  {
    "id": "microsoft-azure-kubernetes-service-aks",
    "category": "Container platform",
    "platform": "Microsoft Azure",
    "title": "Microsoft Azure Kubernetes Service",
    "description": "Secure and monitor your cloud-native workloads on Azure Kubernetes Service (AKS).",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/69c5a6b7620b124ab25d4e59_6883d41dd4096236258251c7_logo-microsoft-azure-kubernetes-service-1280x240-1-1.webp"
  },
  {
    "id": "microsoft-azure-monitor",
    "category": "Monitoring",
    "platform": "Microsoft Azure",
    "title": "Microsoft Azure Monitor",
    "description": "AiRAT integrates with Microsoft Azure Monitor to strengthen monitoring workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": ""
  },
  {
    "id": "microsoft-azure-pipelines",
    "category": "Cloud provider",
    "platform": "Microsoft Azure",
    "title": "Microsoft Azure Pipelines",
    "description": "AiRAT integrates with Microsoft Azure Pipelines to strengthen cloud provider workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/69c5a63aa8cbaf4b152cfece_6883d43e716f923df456848f_logo-microsoft-azure-pipelines-1280x240-1.webp"
  },
  {
    "id": "microsoft-entra",
    "category": "Cloud provider",
    "platform": "Partner",
    "title": "Microsoft Entra",
    "description": "AiRAT integrates with Microsoft Entra to strengthen cloud provider workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/69c5a670a8cbaf4b152d2513_6883d44fc1db65d5bcbfe2fb_logo-microsoft-entra.webp"
  },
  {
    "id": "microsoft-sentinel",
    "category": "Cloud provider",
    "platform": "Partner",
    "title": "Microsoft Sentinel",
    "description": "AiRAT integrates with Microsoft Sentinel to strengthen cloud provider workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": ""
  },
  {
    "id": "mirantis-mke",
    "category": "Cloud provider",
    "platform": "Partner",
    "title": "Mirantis Kubernetes Engine",
    "description": "AiRAT integrates with Mirantis Kubernetes Engine to strengthen cloud provider workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/69c5a64f61e3b133b8f421d8_688298b209eaf86a8f2e3260_Mirantis-MKE-logo-175x45.webp"
  },
  {
    "id": "netskope",
    "category": "Cloud provider",
    "platform": "Partner",
    "title": "Netskope",
    "description": "AiRAT integrates with Netskope to strengthen cloud provider workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/69c5a6896dc03f20977f1535_6883d47d098376bc8cac2a33_Netskope-stacked-logo_white_250px.webp"
  },
  {
    "id": "nomad",
    "category": "Cloud provider",
    "platform": "Partner",
    "title": "nomad",
    "description": "AiRAT integrates with nomad to strengthen cloud provider workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": ""
  },
  {
    "id": "okta",
    "category": "Cloud provider",
    "platform": "Partner",
    "title": "Okta",
    "description": "AiRAT integrates with Okta to strengthen cloud provider workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/69c5a668a8cbaf4b152d206b_688298f11bea3c8037bc7e94_tapp-logo-okta-175x58.png"
  },
  {
    "id": "atlassian-opsgenie",
    "category": "Cloud provider",
    "platform": "Partner",
    "title": "Opsgenie by Atlassian",
    "description": "AiRAT integrates with Opsgenie by Atlassian to strengthen cloud provider workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/69c5a633a317237f8b458cad_6882990a125612e3b90aad98_atlassian-opsgenie-integration-logo.webp"
  },
  {
    "id": "google-cloud-platform-2",
    "category": "Cloud provider",
    "platform": "Oracle",
    "title": "Oracle Cloud",
    "description": "AiRAT partners with Oracle Cloud to deliver cloud and container security and monitoring powered by runtime insights.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/69c5a6bd7419173d36a5a771_6883d4a77a478ef1ec761f68_oracle-logo.webp"
  },
  {
    "id": "google-cloud-kubernetes-engine-2",
    "category": "Container platform",
    "platform": "Oracle",
    "title": "Oracle Cloud Infrastructure Container Engine for Kubernetes (OKE)",
    "description": "AiRAT secures Oracle Cloud Infrastructure Container Engine for Kubernetes (OKE) with runtime-led detection and posture.",
    "logoUrl": ""
  },
  {
    "id": "pagerduty",
    "category": "Incident management",
    "platform": "Partner",
    "title": "PagerDuty",
    "description": "AiRAT integrates with PagerDuty to strengthen incident management workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": ""
  },
  {
    "id": "portworx",
    "category": "Cloud provider",
    "platform": "Partner",
    "title": "Portworx",
    "description": "AiRAT integrates with Portworx to strengthen cloud provider workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/69c5a631cd4631aad66524cd_688299715248bd4127b04b78_logo-portworx-horiz-175x75.png"
  },
  {
    "id": "prometheus",
    "category": "Monitoring",
    "platform": "Partner",
    "title": "Prometheus",
    "description": "AiRAT integrates with Prometheus to strengthen monitoring workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/69c5a60b64c88f38e9610368_6882998e098ecf872f39831a_logo-prometheus-1401x240-1-175x30.png"
  },
  {
    "id": "openshift",
    "category": "Container platform",
    "platform": "Red Hat",
    "title": "Red Hat OpenShift",
    "description": "AiRAT integrates with Red Hat OpenShift to strengthen container platform workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/6883d4f371f8b24153aed1f0_logo-openshift-color-1.svg"
  },
  {
    "id": "redhat-quay",
    "category": "Registry",
    "platform": "Partner",
    "title": "Red Hat Quay",
    "description": "AiRAT integrates with Red Hat Quay to strengthen registry workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/69c5a653a8cbaf4b152d134a_6883d4ff55340074c988d24d_logo-red-hat-quay-1024x240-1.webp"
  },
  {
    "id": "servicenow",
    "category": "Incident management",
    "platform": "Partner",
    "title": "ServiceNow",
    "description": "AiRAT integrates with ServiceNow to strengthen incident management workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/69c5a65136b1a175e857c16c_688299df4ef7e50b0864b7e3_logo-servicenow-1644x240-1-175x26.webp"
  },
  {
    "id": "slack",
    "category": "Cloud provider",
    "platform": "Partner",
    "title": "Slack",
    "description": "AiRAT integrates with Slack to strengthen cloud provider workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/69c5a62bda748794f8eb815a_688299f81b83dd31018870d6_logo-slack-948x240-1-1-1-150x39.png"
  },
  {
    "id": "snyk",
    "category": "Appsec",
    "platform": "Snyk",
    "title": "Snyk",
    "description": "AiRAT integrates with Snyk to strengthen appsec workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/69c5a6967d31413bff3a1550_68829a23307ee9b4a1321453_snyk-logo-black-sm.webp"
  },
  {
    "id": "splunk",
    "category": "Incident management",
    "platform": "Splunk",
    "title": "Splunk",
    "description": "AiRAT integrates with Splunk to strengthen incident management workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": ""
  },
  {
    "id": "victorops",
    "category": "Cloud provider",
    "platform": "Partner",
    "title": "Splunk On-Call (VictorOps)",
    "description": "AiRAT integrates with Splunk On-Call (VictorOps) to strengthen cloud provider workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": ""
  },
  {
    "id": "sumologic",
    "category": "Cloud provider",
    "platform": "Partner",
    "title": "Sumo Logic",
    "description": "AiRAT integrates with Sumo Logic to strengthen cloud provider workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/68829a8f548a3286bef72b5c_tapp-logo-sumo-logic.svg"
  },
  {
    "id": "rancher",
    "category": "Container platform",
    "platform": "Partner",
    "title": "SUSE Rancher",
    "description": "AiRAT integrates with SUSE Rancher to strengthen container platform workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": ""
  },
  {
    "id": "tekton",
    "category": "Cloud provider",
    "platform": "Partner",
    "title": "Tekton",
    "description": "AiRAT integrates with Tekton to strengthen cloud provider workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/69c5a63c7d31413bff39fd82_68829aaa6606b32d5c231da0_logo-tekton-780x240-1-175x54.png"
  },
  {
    "id": "terraform",
    "category": "Cloud provider",
    "platform": "Partner",
    "title": "Terraform",
    "description": "AiRAT integrates with Terraform to strengthen cloud provider workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": ""
  },
  {
    "id": "tines",
    "category": "Cloud provider",
    "platform": "Partner",
    "title": "Tines",
    "description": "AiRAT integrates with Tines to strengthen cloud provider workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": "https://cdn.prod.website-files.com/681e366f54a6e3ce87159ca4/69c5a67c6dc03f20977f0da4_68829adf222d5a61a6299f96_tapp-logo-tines-175x52.png"
  },
  {
    "id": "pivotal-container-service-pks",
    "category": "Cloud provider",
    "platform": "Partner",
    "title": "VMware Tanzu",
    "description": "AiRAT integrates with VMware Tanzu to strengthen cloud provider workflows - unified detection, posture, and response for regulated cloud environments.",
    "logoUrl": ""
  }
] as const;
