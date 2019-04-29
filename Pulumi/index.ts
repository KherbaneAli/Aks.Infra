import * as pulumi from "@pulumi/pulumi";
import * as azure from "@pulumi/azure";

const region = "NorthEurope";
const application = "Aks"
const environment = "Dev"

const appInEnv = `${application}${environment}`;

// Create an Azure Resource Group
const resourceGroup = new azure.core.ResourceGroup(`${appInEnv}ResourceGroup`, {
    name: `${appInEnv}ResourceGroup`.toLowerCase(),
    location: region
});

// Create an Azure resource (Storage Account)
const account = new azure.storage.Account(
    `${appInEnv}Storage`,
  {
    name: `${appInEnv}Storage`.toLowerCase(),
    resourceGroupName: resourceGroup.name,
    location: resourceGroup.location,
    accountTier: "Standard",
    accountReplicationType: "LRS",
  }
);

const registry = new azure.containerservice.Registry(
    `${appInEnv}Registry`,
  {
    name: `${appInEnv}Registry`.toLowerCase(),
    adminEnabled: true,
    location: resourceGroup.location,
    resourceGroupName: resourceGroup.name,
    sku: "Basic"
  }
);

export const output = {
    registry: registry
}


