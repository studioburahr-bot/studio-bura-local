import { Eye } from "./Eye";

export function Eyes() {
  return (
    <div className="relative shrink-0" data-name="eyes">
      <div className="box-border content-stretch flex flex-row gap-1 items-center justify-center p-0 relative">
        <Eye isRightEye={false} />
        <Eye isRightEye={true} />
      </div>
    </div>
  );
}
