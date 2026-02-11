'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useThumbnail } from '@/context/thumbnail-context';
import { colorsPicker, thumbnailsTypes } from '@/lib/data';
import { getIconComponent, toIconName } from '@/lib/icons';
import { toPng } from 'html-to-image';
import {
  CheckIcon,
  GalleryThumbnails,
  ImageDown,
  Moon,
  PlusIcon,
  Sun,
} from 'lucide-react';
import { useRef, useState } from 'react';
import { CirclePicker } from 'react-color';
import BackgroundThumbnail from './BackgroundThumbnaill';
import DefaultThumbnail from './DefaultTumbnail';
import NeonThumbnail from './NeonThumbnail';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';

import {
  Tags,
  TagsContent,
  TagsEmpty,
  TagsGroup,
  TagsInput,
  TagsItem,
  TagsList,
  TagsTrigger,
  TagsValue,
} from '@/components/ui/shadcn-io/tags';

export default function ThumbnailGen() {
  const elementRef = useRef(null);
  const { thumbnail, setThumbnail } = useThumbnail();

  const [newTag, setNewTag] = useState<string>('');
  const [customTags, setCustomTags] = useState<{ id: string; label: string }[]>(
    []
  );

  // Couleur des icônes : défaut (couleur originale) ou basée sur darkMode
  const iconColor = thumbnail.useDefaultIconColor
    ? 'default'
    : thumbnail.darkMode
    ? '#fff'
    : '#000';

  const htmlToImageConvert = () => {
    toPng(elementRef.current ?? document.createElement('div'), {
      cacheBust: false,
      canvasWidth: 1280,
      canvasHeight: 720,
    })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `thumbnail.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Liste des icônes sélectionnées (features cochées)
  const selectedIcons = thumbnail.features
    .filter((f) => f.checked)
    .map((f) => f.iconId);

  // Tous les tags disponibles (features + custom)
  const allTags = [
    ...thumbnail.features.map((f) => ({ id: f.iconId, label: f.name })),
    ...customTags,
  ];

  const handleRemove = (iconId: string) => {
    // Décoche la feature correspondante
    const featureIndex = thumbnail.features.findIndex(
      (f) => f.iconId === iconId
    );
    if (featureIndex !== -1) {
      const newFeatures = [...thumbnail.features];
      newFeatures[featureIndex] = {
        ...newFeatures[featureIndex],
        checked: false,
      };
      setThumbnail({ ...thumbnail, features: newFeatures });
    } else {
      // C'est un tag custom, on le retire
      setCustomTags((prev) => prev.filter((t) => t.id !== iconId));
    }
  };

  const handleSelect = (iconId: string) => {
    const featureIndex = thumbnail.features.findIndex(
      (f) => f.iconId === iconId
    );
    if (featureIndex !== -1) {
      // Toggle la feature
      const newFeatures = [...thumbnail.features];
      newFeatures[featureIndex] = {
        ...newFeatures[featureIndex],
        checked: !newFeatures[featureIndex].checked,
      };
      setThumbnail({ ...thumbnail, features: newFeatures });
    } else {
      // C'est un tag custom, on l'ajoute aux features
      const customTag = customTags.find((t) => t.id === iconId);
      if (customTag) {
        const newFeatures = [
          ...thumbnail.features,
          {
            name: customTag.label,
            iconId: customTag.id,
            label: customTag.label,
            checked: true,
          },
        ];
        setThumbnail({ ...thumbnail, features: newFeatures });
        // Retire des custom tags car maintenant c'est une feature
        setCustomTags((prev) => prev.filter((t) => t.id !== iconId));
      }
    }
  };

  const handleCreateTag = () => {
    if (!newTag.trim()) return;

    const iconId = toIconName(newTag);
    const iconExists = getIconComponent(iconId) !== null;

    if (!iconExists) {
      console.warn(`Icon "${iconId}" not found in the library`);
      return;
    }

    // Vérifie si l'icône existe déjà dans les features
    const existingFeature = thumbnail.features.find((f) => f.iconId === iconId);
    if (existingFeature) {
      // Active simplement la feature existante
      const featureIndex = thumbnail.features.findIndex(
        (f) => f.iconId === iconId
      );
      const newFeatures = [...thumbnail.features];
      newFeatures[featureIndex] = {
        ...newFeatures[featureIndex],
        checked: true,
      };
      setThumbnail({ ...thumbnail, features: newFeatures });
    } else {
      // Ajoute une nouvelle feature
      const newFeatures = [
        ...thumbnail.features,
        {
          name: newTag,
          iconId: iconId,
          label: newTag,
          checked: true,
        },
      ];
      setThumbnail({ ...thumbnail, features: newFeatures });
    }

    setNewTag('');
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl flex flex-col gap-3 items-center mt-10">
        <GalleryThumbnails size={50} /> Thumbnail Generator
      </h1>
      <div className="flex items-center justify-center space-x-2">
        <Sun />
        <Switch
          checked={thumbnail.darkMode}
          onCheckedChange={() =>
            setThumbnail({ ...thumbnail, darkMode: !thumbnail.darkMode })
          }
          id="darkmode"
        />
        <Moon />
      </div>

      {thumbnail.Type === 'background' ? (
        <BackgroundThumbnail elementRef={elementRef} />
      ) : thumbnail.Type === 'neon' ? (
        <NeonThumbnail elementRef={elementRef} />
      ) : (
        <DefaultThumbnail elementRef={elementRef} />
      )}

      <Button
        className="w-full"
        onClick={htmlToImageConvert}
        variant={'outline'}
      >
        Download
      </Button>

      <div className="flex gap-5 justify-between flex-col sm:flex-row">
        <div className="w-full">
          <CirclePicker
            colors={[...colorsPicker]}
            color={thumbnail.hexColor}
            onChangeComplete={(color) =>
              setThumbnail({ ...thumbnail, hexColor: color.hex })
            }
            width="100%"
            className="!grid grid-cols-9 sm:grid-cols-7"
          />
        </div>
        <div className="flex flex-col gap-5 flex-shrink-0">
          <Textarea
            value={thumbnail.title}
            onChange={(e) =>
              setThumbnail({ ...thumbnail, title: e.target.value })
            }
            className="resize-none"
          />

          <div className="flex gap-5">
            <Input
              type="text"
              value={thumbnail.info}
              onChange={(e) =>
                setThumbnail({ ...thumbnail, info: e.target.value })
              }
            />
            <Select
              onValueChange={(value) =>
                setThumbnail({ ...thumbnail, Type: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={'Default'}></SelectValue>
              </SelectTrigger>
              <SelectContent>
                {thumbnailsTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center w-full">
        <Label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-dashed cursor-pointer rounded-md border border-input bg-background px-3 py-2 text-sm hover:opacity-80 transition"
        >
          <div className="flex flex-col items-center justify-center gap-1">
            <ImageDown size={30} />
            <p className="text-sm">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-sm ">SVG, PNG, JPG (Pref. 1280x720px)</p>
          </div>
          <Input
            type="file"
            accept="image/*"
            id="dropzone-file"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              setThumbnail({
                ...thumbnail,
                selectedImage: file ? URL.createObjectURL(file) : undefined,
              });
            }}
          />
        </Label>
      </div>

      {/* Sélecteur d'icônes */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Checkbox
            id="defaultColor"
            checked={thumbnail.useDefaultIconColor}
            onCheckedChange={() =>
              setThumbnail({
                ...thumbnail,
                useDefaultIconColor: !thumbnail.useDefaultIconColor,
              })
            }
          />
          <Label htmlFor="defaultColor" className="cursor-pointer">
            Utiliser les couleurs originales des icônes
          </Label>
        </div>

        <Tags className="w-full">
          <TagsTrigger>
            {selectedIcons.map((iconId) => (
              <TagsValue key={iconId} onRemove={() => handleRemove(iconId)}>
                {allTags.find((t) => t.id === iconId)?.label}
              </TagsValue>
            ))}
          </TagsTrigger>
          <TagsContent>
            <TagsInput
              value={newTag}
              onValueChange={setNewTag}
              placeholder="Rechercher une icône..."
            />
            <TagsList>
              <TagsEmpty>
                <button
                  className="mx-auto flex cursor-pointer items-center gap-2"
                  onClick={handleCreateTag}
                  type="button"
                >
                  <PlusIcon className="text-muted-foreground" size={14} />
                  Créer : {newTag}
                </button>
              </TagsEmpty>
              <TagsGroup>
                {allTags
                  .filter((tag) =>
                    tag.label.toLowerCase().includes(newTag.toLowerCase())
                  )
                  .map((tag) => {
                    const isSelected = selectedIcons.includes(tag.id);
                    return (
                      <TagsItem
                        key={tag.id}
                        onSelect={handleSelect}
                        value={tag.id}
                      >
                        {tag.label}
                        {isSelected && (
                          <CheckIcon
                            className="text-muted-foreground"
                            size={14}
                          />
                        )}
                      </TagsItem>
                    );
                  })}
              </TagsGroup>
            </TagsList>
          </TagsContent>
        </Tags>

        {/* Prévisualisation des icônes sélectionnées */}
        <div className="flex gap-3 flex-wrap">
          {selectedIcons.map((iconId) => {
            const IconComponent = getIconComponent(iconId);
            return IconComponent ? (
              <IconComponent key={iconId} color={iconColor} size={32} />
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
}
