import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const pbxPath = join(__dirname, '..', 'ios', 'App', 'App.xcodeproj', 'project.pbxproj')

const marker = '/* End PBXNativeTarget section */'
if (readFileSync(pbxPath, 'utf8').includes('FeriadappWidgetExtension')) {
  console.log('El widget iOS ya está configurado en el proyecto Xcode.')
  process.exit(0)
}

const patch = `
\t\tF1A100012FED79650016851F /* FeriadappWidgetExtension */ = {
\t\t\tisa = PBXNativeTarget;
\t\t\tbuildConfigurationList = F1A100022FED79650016851F /* Build configuration list for PBXNativeTarget "FeriadappWidgetExtension" */;
\t\t\tbuildPhases = (
\t\t\t\tF1A100032FED79650016851F /* Sources */,
\t\t\t\tF1A100042FED79650016851F /* Frameworks */,
\t\t\t\tF1A100052FED79650016851F /* Resources */,
\t\t\t);
\t\t\tbuildRules = (
\t\t\t);
\t\t\tdependencies = (
\t\t\t);
\t\t\tname = FeriadappWidgetExtension;
\t\t\tproductName = FeriadappWidgetExtension;
\t\t\tproductReference = F1A100062FED79650016851F /* FeriadappWidgetExtension.appex */;
\t\t\tproductType = "com.apple.product-type.app-extension";
\t\t};
`

const buildFiles = `
\t\tF1A100072FED79650016851F /* WidgetBridgePlugin.swift in Sources */ = {isa = PBXBuildFile; fileRef = F1A100082FED79650016851F /* WidgetBridgePlugin.swift */; };
\t\tF1A100092FED79650016851F /* WidgetDataStore.swift in Sources */ = {isa = PBXBuildFile; fileRef = F1A1000A2FED79650016851F /* WidgetDataStore.swift */; };
\t\tF1A1000B2FED79650016851F /* FeriadappWidget.swift in Sources */ = {isa = PBXBuildFile; fileRef = F1A1000C2FED79650016851F /* FeriadappWidget.swift */; };
\t\tF1A1000D2FED79650016851F /* FeriadappWidgetBundle.swift in Sources */ = {isa = PBXBuildFile; fileRef = F1A1000E2FED79650016851F /* FeriadappWidgetBundle.swift */; };
\t\tF1A1000F2FED79650016851F /* WidgetDataStore.swift in Sources */ = {isa = PBXBuildFile; fileRef = F1A1000A2FED79650016851F /* WidgetDataStore.swift */; };
\t\tF1A100102FED79650016851F /* FeriadappWidgetExtension.appex in Embed Foundation Extensions */ = {isa = PBXBuildFile; fileRef = F1A100062FED79650016851F /* FeriadappWidgetExtension.appex */; settings = {ATTRIBUTES = (RemoveHeadersOnCopy, ); }; };
`

const fileRefs = `
\t\tF1A100062FED79650016851F /* FeriadappWidgetExtension.appex */ = {isa = PBXFileReference; explicitFileType = "wrapper.app-extension"; includeInIndex = 0; path = FeriadappWidgetExtension.appex; sourceTree = BUILT_PRODUCTS_DIR; };
\t\tF1A100082FED79650016851F /* WidgetBridgePlugin.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = WidgetBridgePlugin.swift; sourceTree = "<group>"; };
\t\tF1A1000A2FED79650016851F /* WidgetDataStore.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = WidgetDataStore.swift; sourceTree = "<group>"; };
\t\tF1A1000C2FED79650016851F /* FeriadappWidget.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = FeriadappWidget.swift; sourceTree = "<group>"; };
\t\tF1A1000E2FED79650016851F /* FeriadappWidgetBundle.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = FeriadappWidgetBundle.swift; sourceTree = "<group>"; };
\t\tF1A100112FED79650016851F /* Info.plist */ = {isa = PBXFileReference; lastKnownFileType = text.plist.xml; path = Info.plist; sourceTree = "<group>"; };
\t\tF1A100122FED79650016851F /* FeriadappWidget.entitlements */ = {isa = PBXFileReference; lastKnownFileType = text.plist.entitlements; path = FeriadappWidget.entitlements; sourceTree = "<group>"; };
\t\tF1A100132FED79650016851F /* App.entitlements */ = {isa = PBXFileReference; lastKnownFileType = text.plist.entitlements; path = App.entitlements; sourceTree = "<group>"; };
`

const groups = `
\t\tF1A100142FED79650016851F /* Shared */ = {
\t\t\tisa = PBXGroup;
\t\t\tchildren = (
\t\t\t\tF1A1000A2FED79650016851F /* WidgetDataStore.swift */,
\t\t\t);
\t\t\tpath = ../Shared;
\t\t\tsourceTree = "<group>";
\t\t};
\t\tF1A100152FED79650016851F /* FeriadappWidget */ = {
\t\t\tisa = PBXGroup;
\t\t\tchildren = (
\t\t\t\tF1A1000C2FED79650016851F /* FeriadappWidget.swift */,
\t\t\t\tF1A1000E2FED79650016851F /* FeriadappWidgetBundle.swift */,
\t\t\t\tF1A100112FED79650016851F /* Info.plist */,
\t\t\t\tF1A100122FED79650016851F /* FeriadappWidget.entitlements */,
\t\t\t);
\t\t\tpath = ../../FeriadappWidget;
\t\t\tsourceTree = "<group>";
\t\t};
`

const embedPhase = `
\t\tF1A100162FED79650016851F /* Embed Foundation Extensions */ = {
\t\t\tisa = PBXCopyFilesBuildPhase;
\t\t\tbuildActionMask = 2147483647;
\t\t\tdstPath = "";
\t\t\tdstSubfolderSpec = 13;
\t\t\tfiles = (
\t\t\t\tF1A100102FED79650016851F /* FeriadappWidgetExtension.appex in Embed Foundation Extensions */,
\t\t\t);
\t\t\tname = "Embed Foundation Extensions";
\t\t\trunOnlyForDeploymentPostprocessing = 0;
\t\t};
`

const widgetSources = `
\t\tF1A100032FED79650016851F /* Sources */ = {
\t\t\tisa = PBXSourcesBuildPhase;
\t\t\tbuildActionMask = 2147483647;
\t\t\tfiles = (
\t\t\t\tF1A1000B2FED79650016851F /* FeriadappWidget.swift in Sources */,
\t\t\t\tF1A1000D2FED79650016851F /* FeriadappWidgetBundle.swift in Sources */,
\t\t\t\tF1A1000F2FED79650016851F /* WidgetDataStore.swift in Sources */,
\t\t\t);
\t\t\trunOnlyForDeploymentPostprocessing = 0;
\t\t};
`

const widgetFrameworks = `
\t\tF1A100042FED79650016851F /* Frameworks */ = {
\t\t\tisa = PBXFrameworksBuildPhase;
\t\t\tbuildActionMask = 2147483647;
\t\t\tfiles = (
\t\t\t);
\t\t\trunOnlyForDeploymentPostprocessing = 0;
\t\t};
`

const widgetResources = `
\t\tF1A100052FED79650016851F /* Resources */ = {
\t\t\tisa = PBXResourcesBuildPhase;
\t\t\tbuildActionMask = 2147483647;
\t\t\tfiles = (
\t\t\t);
\t\t\trunOnlyForDeploymentPostprocessing = 0;
\t\t};
`

const dependency = `
\t\tF1A100172FED79650016851F /* PBXTargetDependency */ = {
\t\t\tisa = PBXTargetDependency;
\t\t\ttarget = F1A100012FED79650016851F /* FeriadappWidgetExtension */;
\t\t\ttargetProxy = F1A100182FED79650016851F /* PBXContainerItemProxy */;
\t\t};
`

const proxy = `
\t\tF1A100182FED79650016851F /* PBXContainerItemProxy */ = {
\t\t\tisa = PBXContainerItemProxy;
\t\t\tcontainerPortal = 504EC2FC1FED79650016851F /* Project object */;
\t\t\tproxyType = 1;
\t\t\tremoteGlobalIDString = F1A100012FED79650016851F;
\t\t\tremoteInfo = FeriadappWidgetExtension;
\t\t};
`

const widgetConfigs = `
\t\tF1A100192FED79650016851F /* Debug */ = {
\t\t\tisa = XCBuildConfiguration;
\t\t\tbuildSettings = {
\t\t\t\tCODE_SIGN_ENTITLEMENTS = ../../FeriadappWidget/FeriadappWidget.entitlements;
\t\t\t\tCODE_SIGN_STYLE = Automatic;
\t\t\t\tCURRENT_PROJECT_VERSION = 1;
\t\t\t\tINFOPLIST_FILE = ../../FeriadappWidget/Info.plist;
\t\t\t\tIPHONEOS_DEPLOYMENT_TARGET = 15.0;
\t\t\t\tLD_RUNPATH_SEARCH_PATHS = (
\t\t\t\t\t"$(inherited)",
\t\t\t\t\t"@executable_path/Frameworks",
\t\t\t\t\t"@executable_path/../../Frameworks",
\t\t\t\t);
\t\t\t\tMARKETING_VERSION = 1.0;
\t\t\t\tPRODUCT_BUNDLE_IDENTIFIER = com.feriadapp.app.FeriadappWidget;
\t\t\t\tPRODUCT_NAME = "$(TARGET_NAME)";
\t\t\t\tSKIP_INSTALL = YES;
\t\t\t\tSWIFT_EMIT_LOC_STRINGS = YES;
\t\t\t\tSWIFT_VERSION = 5.0;
\t\t\t\tTARGETED_DEVICE_FAMILY = "1,2";
\t\t\t};
\t\t\tname = Debug;
\t\t};
\t\tF1A1001A2FED79650016851F /* Release */ = {
\t\t\tisa = XCBuildConfiguration;
\t\t\tbuildSettings = {
\t\t\t\tCODE_SIGN_ENTITLEMENTS = ../../FeriadappWidget/FeriadappWidget.entitlements;
\t\t\t\tCODE_SIGN_STYLE = Automatic;
\t\t\t\tCURRENT_PROJECT_VERSION = 1;
\t\t\t\tINFOPLIST_FILE = ../../FeriadappWidget/Info.plist;
\t\t\t\tIPHONEOS_DEPLOYMENT_TARGET = 15.0;
\t\t\t\tLD_RUNPATH_SEARCH_PATHS = (
\t\t\t\t\t"$(inherited)",
\t\t\t\t\t"@executable_path/Frameworks",
\t\t\t\t\t"@executable_path/../../Frameworks",
\t\t\t\t);
\t\t\t\tMARKETING_VERSION = 1.0;
\t\t\t\tPRODUCT_BUNDLE_IDENTIFIER = com.feriadapp.app.FeriadappWidget;
\t\t\t\tPRODUCT_NAME = "$(TARGET_NAME)";
\t\t\t\tSKIP_INSTALL = YES;
\t\t\t\tSWIFT_EMIT_LOC_STRINGS = YES;
\t\t\t\tSWIFT_VERSION = 5.0;
\t\t\t\tTARGETED_DEVICE_FAMILY = "1,2";
\t\t\t};
\t\t\tname = Release;
\t\t};
`

const widgetConfigList = `
\t\tF1A100022FED79650016851F /* Build configuration list for PBXNativeTarget "FeriadappWidgetExtension" */ = {
\t\t\tisa = XCConfigurationList;
\t\t\tbuildConfigurations = (
\t\t\t\tF1A100192FED79650016851F /* Debug */,
\t\t\t\tF1A1001A2FED79650016851F /* Release */,
\t\t\t);
\t\t\tdefaultConfigurationIsVisible = 0;
\t\t\tdefaultConfigurationName = Release;
\t\t};
`

let content = readFileSync(pbxPath, 'utf8')

content = content.replace(
  '/* End PBXBuildFile section */',
  `${buildFiles}/* End PBXBuildFile section */`,
)

content = content.replace(
  '504EC3131FED79650016851F /* Info.plist */ = {isa = PBXFileReference; lastKnownFileType = text.plist.xml; path = Info.plist; sourceTree = "<group>"; };',
  `504EC3131FED79650016851F /* Info.plist */ = {isa = PBXFileReference; lastKnownFileType = text.plist.xml; path = Info.plist; sourceTree = "<group>"; };
${fileRefs}`,
)

content = content.replace(
  '504EC2FB1FED79650016851F = {',
  `504EC2FB1FED79650016851F = {`,
)

content = content.replace(
  'children = (\n\t\t\t\t958DCC722DB07C7200EA8C5F /* debug.xcconfig */,',
  `children = (
\t\t\t\tF1A100142FED79650016851F /* Shared */,
\t\t\t\tF1A100152FED79650016851F /* FeriadappWidget */,
\t\t\t\t958DCC722DB07C7200EA8C5F /* debug.xcconfig */,`,
)

content = content.replace(
  '504EC3041FED79650016851F /* App.app */,',
  `504EC3041FED79650016851F /* App.app */,
\t\t\t\tF1A100062FED79650016851F /* FeriadappWidgetExtension.appex */,`,
)

content = content.replace(
  '504EC3071FED79650016851F /* AppDelegate.swift */,',
  `504EC3071FED79650016851F /* AppDelegate.swift */,
\t\t\t\tF1A100082FED79650016851F /* WidgetBridgePlugin.swift */,
\t\t\t\tF1A100132FED79650016851F /* App.entitlements */,`,
)

content = content.replace(marker, `${patch}${marker}`)

content = content.replace(
  'buildPhases = (\n\t\t\t\t504EC3001FED79650016851F /* Sources */,',
  `buildPhases = (
\t\t\t\t504EC3001FED79650016851F /* Sources */,
\t\t\t\tF1A100162FED79650016851F /* Embed Foundation Extensions */,`,
)

content = content.replace(
  'dependencies = (\n\t\t\t);',
  `dependencies = (
\t\t\t\tF1A100172FED79650016851F /* PBXTargetDependency */,
\t\t\t);`,
)

content = content.replace(
  'targets = (\n\t\t\t\t504EC3031FED79650016851F /* App */,',
  `targets = (
\t\t\t\t504EC3031FED79650016851F /* App */,
\t\t\t\tF1A100012FED79650016851F /* FeriadappWidgetExtension */,`,
)

content = content.replace(
  '504EC3081FED79650016851F /* AppDelegate.swift in Sources */,',
  `504EC3081FED79650016851F /* AppDelegate.swift in Sources */,
\t\t\t\tF1A100072FED79650016851F /* WidgetBridgePlugin.swift in Sources */,
\t\t\t\tF1A100092FED79650016851F /* WidgetDataStore.swift in Sources */,`,
)

content = content.replace(
  '504EC3171FED79650016851F /* Debug */ = {',
  `504EC3171FED79650016851F /* Debug */ = {`,
)

content = content.replace(
  /504EC3171FED79650016851F \/\* Debug \*\/ = \{[\s\S]*?CODE_SIGN_STYLE = Automatic;/,
  (match) => `${match}
\t\t\t\tCODE_SIGN_ENTITLEMENTS = App/App.entitlements;`,
)

content = content.replace(
  /504EC3181FED79650016851F \/\* Release \*\/ = \{[\s\S]*?CODE_SIGN_STYLE = Automatic;/,
  (match) => `${match}
\t\t\t\tCODE_SIGN_ENTITLEMENTS = App/App.entitlements;`,
)

content = content.replace(
  'TargetAttributes = {\n\t\t\t\t\t504EC3031FED79650016851F = {',
  `TargetAttributes = {
\t\t\t\t\t504EC3031FED79650016851F = {
\t\t\t\t\t\tSystemCapabilities = {
\t\t\t\t\t\t\tcom.apple.ApplicationGroups.iOS = {
\t\t\t\t\t\t\t\tenabled = 1;
\t\t\t\t\t\t\t};
\t\t\t\t\t\t};`,
)

content = content.replace(
  '/* End PBXCopyFilesBuildPhase section */',
  `${embedPhase}/* End PBXCopyFilesBuildPhase section */`,
)

if (!content.includes('Begin PBXCopyFilesBuildPhase section')) {
  content = content.replace(
    '/* End PBXResourcesBuildPhase section */',
    `/* End PBXResourcesBuildPhase section */

/* Begin PBXCopyFilesBuildPhase section */
${embedPhase}/* End PBXCopyFilesBuildPhase section */`,
  )
}

content = content.replace(
  '/* End PBXFrameworksBuildPhase section */',
  `${widgetFrameworks}/* End PBXFrameworksBuildPhase section */`,
)

content = content.replace(
  '/* End PBXResourcesBuildPhase section */',
  `${widgetResources}/* End PBXResourcesBuildPhase section */`,
)

content = content.replace(
  '/* End PBXSourcesBuildPhase section */',
  `${widgetSources}/* End PBXSourcesBuildPhase section */`,
)

content = content.replace(
  '/* End PBXContainerItemProxy section */',
  `${proxy}/* End PBXContainerItemProxy section */`,
)

if (!content.includes('Begin PBXContainerItemProxy section')) {
  content = content.replace(
    '/* End PBXNativeTarget section */',
    `/* End PBXNativeTarget section */

/* Begin PBXContainerItemProxy section */
${proxy}/* End PBXContainerItemProxy section */`,
  )
}

content = content.replace(
  '/* End PBXTargetDependency section */',
  `${dependency}/* End PBXTargetDependency section */`,
)

if (!content.includes('Begin PBXTargetDependency section')) {
  content = content.replace(
    '/* End PBXContainerItemProxy section */',
    `/* End PBXContainerItemProxy section */

/* Begin PBXTargetDependency section */
${dependency}/* End PBXTargetDependency section */`,
  )
}

content = content.replace(
  '/* End PBXGroup section */',
  `${groups}/* End PBXGroup section */`,
)

content = content.replace(
  '/* End XCBuildConfiguration section */',
  `${widgetConfigs}/* End XCBuildConfiguration section */`,
)

content = content.replace(
  '/* End XCConfigurationList section */',
  `${widgetConfigList}/* End XCConfigurationList section */`,
)

writeFileSync(pbxPath, content)
console.log('Widget iOS configurado en project.pbxproj')
