import type { ComponentPublicInstance, VNodeProps } from 'vue'
import { computed, defineComponent, h, ref } from 'vue'
import type { ComponentPropsWithoutRef, ElementRef } from '@oku-ui/primitive'
import { Primitive } from '@oku-ui/primitive'

type PrimitiveAspectRatioProps = ComponentPropsWithoutRef<typeof Primitive.div>
type AspectRatioElement = ElementRef<typeof Primitive.div>

const NAME = 'AspectRatio'

const AspectRatio = defineComponent({
  name: NAME,
  inheritAttrs: false,
  props: {
    ratio: {
      type: Number,
      default: 1 / 1,
    },
  },
  setup(props, { attrs, slots, expose }) {
    const { style, ...aspectRatioProps } = attrs as PrimitiveAspectRatioProps
    const innerRef = ref<ComponentPublicInstance>()

    expose({
      innerRef: computed(() => innerRef.value?.$el),
    })

    const originalReturn = () => h(
      'div', {
        'style': {
          position: 'relative',
          width: '100%',
          paddingBottom: `${100 / props.ratio}%`,
        },
        'data-radix-aspect-ratio-wrapper': '',
      },
      [
        h(
          Primitive.div,
          {
            ...aspectRatioProps,
            ref: innerRef,
            style: {
              ...(style as any),
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            },
          },
          () => slots.default?.(),
        ),
      ],
    )

    return originalReturn as unknown as {
      innerRef: AspectRatioElement
    }
  },
})

export type ComponentProps<T> =
  T extends new () => { $props: infer P } ? NonNullable<P> :
    T extends (props: infer P, ...args: any) => any ? P :
        {}

type Merge<T, U> = Omit<ComponentProps<T>, keyof VNodeProps | 'class' | 'style'> & U

type AspectRatioProps = Merge<typeof AspectRatio, PrimitiveAspectRatioProps>
const OkuAspectRatio = AspectRatio as typeof AspectRatio & (new () => { $props: AspectRatioProps })

type OkuAspectRatioElement = Omit<InstanceType<typeof AspectRatio>, keyof ComponentPublicInstance>

export { OkuAspectRatio }
export type { AspectRatioProps, OkuAspectRatioElement }
