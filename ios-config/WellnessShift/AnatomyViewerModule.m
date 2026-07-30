// ios/WellnessShift/AnatomyViewerModule.m
// Objective-C bridge — required to expose the Swift module to React Native

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(AnatomyViewerModule, NSObject)

RCT_EXTERN_METHOD(openModel:(NSString *)modelId)

@end
