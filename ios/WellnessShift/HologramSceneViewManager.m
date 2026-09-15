#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(HologramSceneViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(modelFile, NSString)
RCT_EXPORT_VIEW_PROPERTY(preset, NSString)
RCT_EXPORT_VIEW_PROPERTY(autoRotate, BOOL)

@end
