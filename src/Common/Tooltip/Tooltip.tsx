import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { TooltipHost, ITooltipHostStyles, ITooltipProps } from 'office-ui-fabric-react/lib/Tooltip';
import { useId } from '@uifabric/react-hooks';

const calloutProps = { gapSpace: 0 };
// The TooltipHost root uses display: inline by default.
// If that's causing sizing issues or tooltip positioning issues, try overriding to inline-block.
const hostStyles: Partial<ITooltipHostStyles> = { root: { display: 'inline-block' } };

export default function ToolTip(props: ITooltipProps) {
    const tooltipId = useId('tooltip');
    return (
        <div>
            <TooltipHost
                content={props.content}
                // This id is used on the tooltip itself, not the host
                // (so an element with this id only exists when the tooltip is shown)
                id={tooltipId}
                calloutProps={calloutProps}
                styles={hostStyles}
            >
                <div aria-describedby={tooltipId}>{props.content}</div>
            </TooltipHost>
        </div>
    );
}
