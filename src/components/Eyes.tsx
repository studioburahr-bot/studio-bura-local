import { Eye } from "./Eye";

export function Eyes() {
  return (
    // The pair is 412px wide (two 204px eyes, 4px apart) and doesn't shrink, so on viewports narrower than
    // 444px (412 + the 16px page gutters) it overflowed the page. Up to 444px it's zoomed to 60% (247px), which
    // scales the eyes and pupils together and shrinks their layout box too. Wider screens are unchanged.
    <div className="relative shrink-0 max-[444px]:[zoom:0.6]" data-name="eyes">
      <div className="box-border content-stretch flex flex-row gap-1 items-center justify-center p-0 relative">
        <Eye isRightEye={false} />
        <Eye isRightEye={true} />
      </div>
    </div>
  );
}
