import type { PropType } from 'vue'
import { computed, defineComponent, h, ref } from 'vue'
import type { ElementType, MergeProps, PrimitiveProps, RefElement } from '@oku-ui/primitive'
import { Primitive } from '@oku-ui/primitive'
import type { Scope } from '@oku-ui/provide'
import { createProvideScope } from '@oku-ui/provide'

const AVATAR_NAME = 'Avatar'
const [createAvatarProvide, createAvatarScope] = createProvideScope(AVATAR_NAME)

type ImageLoadingStatus = 'idle' | 'loading' | 'loaded' | 'error'

type AvatarProvideValue = {
  imageLoadingStatus: ImageLoadingStatus
  onImageLoadingStatusChange(status: ImageLoadingStatus): void
}

export const [AvatarProvider, useAvatarInject] = createAvatarProvide<AvatarProvideValue>(AVATAR_NAME)

type AvatarElement = ElementType<'span'>

interface AvatarProps extends PrimitiveProps {
  scopeAvatar?: Scope
}

const Avatar = defineComponent({
  name: AVATAR_NAME,
  inheritAttrs: false,
  props: {
    scopeAvatar: {
      type: Object as unknown as PropType<Scope>,
      required: false,
    },
  },
  setup(props, { attrs, slots, expose }) {
    const { ...avatarProps } = attrs as AvatarElement
    const innerRef = ref()
    const imageLoadingStatus = ref<ImageLoadingStatus>('idle')

    AvatarProvider({
      scope: props.scopeAvatar,
      imageLoadingStatus: imageLoadingStatus.value,
      onImageLoadingStatusChange: (status: ImageLoadingStatus) => {
        imageLoadingStatus.value = status
      },
    })

    expose({
      inferRef: computed(() => innerRef.value?.$el),
    })

    const originalReturn = () => h(
      Primitive.span, {
        ...avatarProps,
        ref: innerRef,
      },
      {
        default: () => slots.default?.(),
      },
    )
    return originalReturn as unknown as {
      innerRef: AvatarElement
    }
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
type _OkuAvatarProps = MergeProps<AvatarProps, AvatarElement>

type AvatarRef = RefElement<typeof Avatar>

const OkuAvatar = Avatar as typeof Avatar & (new () => { $props: _OkuAvatarProps })

export {
  OkuAvatar,
  createAvatarScope,
}

export type {
  AvatarProps,
  AvatarElement,
  AvatarRef,

}
