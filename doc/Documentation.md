# Documentation

- [Documentation](#documentation)
  - [PassageMetadata](#passagemetadata)
    - [PassageMetadata - `isEnable`](#passagemetadata---isenable)
    - [PassageMetadata - `type`](#passagemetadata---type)
    - [PassageMetadata - `threshold`](#passagemetadata---threshold)
    - [PassageMetadata - `filter`](#passagemetadata---filter)
    - [PassageMetadata - `tags`](#passagemetadata---tags)
    - [PassageMetadata - `groups`](#passagemetadata---groups)
    - [PassageMetadata - `limitationStrategy`](#passagemetadata---limitationstrategy)
  - [Sugarcube widgets](#sugarcube-widgets)
    - [Widget - `<<RE [[PassageName]]>>`](#widget---re-passagename)
    - [Widget - `<<REGroup "GroupName">>`](#widget---regroup-groupname)
    - [Widget - `<<REEnable [[PassageName]]>>`](#widget---reenable-passagename)
    - [Widget - `<<REDisable [[PassageName]]>>`](#widget---redisable-passagename)
    - [Widget - `<<REEnableByTag "TagName">>`](#widget---reenablebytag-tagname)
    - [Widget - `<<REDisableByTag "TagName">>`](#widget---redisablebytag-tagname)

## PassageMetadata

In order for a passage to be added to the list of random events, you need to add the `passage_metadata` tag to the passage tags and at the beginning of the passage `<<PassageMetadata>>JSON Config<</PassageMetadata>>`

Example:

```html
:: ExamplePassage [passage_metadata]
<<PassageMetadata>>{
    isEnabled: true,
    type: "goto",
    threshold: 100,
    filter: `true`,
    tags: ["Place", "Daily", "Weekly", "$currentDayTime"],
    groups: [
        {
            name: "GroupName",
            weight: 10,
            type: "sequential",
            sequentialIndex: 1,
            sequentialCount: 1
        },
    ],
    limitationStrategy: [
        { max: 1, tags: ["Place", "Morning"], isSeparate: true },
        { max: 1, tags: ["Place", "Noon"], isSeparate: true },
        { max: 1, tags: ["Place", "Afternoon"], isSeparate: true },
        { max: 1, tags: ["Place", "Evening"], isSeparate: true },
        { max: 1, tags: ["Place", "Night"], isSeparate: true },
        { max: 1, tags: ["Place", "Daily"], isSeparate: true },
        { max: 1, tags: ["Place", "Weekly"], isSeparate: true },
    ]
}<</PassageMetadata>>
```

### PassageMetadata - `isEnable`

The `isEnabled` key has a **boolean** value and is used to enable or disable a random event.

- Events with `isEnabled: true` can be called via [`<<RE [[PassageName]]>>`](#widget---re-passagename) or via [`<<REGroup "GroupName">>`](#widget---regroup-groupname)
- Events with `isEnabled: false` will be skipped

> [!NOTE]
> Even if an event has been disabled, it can still be navigated to as a normal passage (e.g. via the `[[ExampleEvent]]` link or `<<goto [[ExampleEvent]]>>`)
> [!NOTE]
> To enable/disable events from code use [`<<REEnable [[PassageName]]>>`](#widget---reenable-passagename), [`<<REDisable [[PassageName]]>>`](#widget---redisable-passagename), [`<<REEnableByTag "TagName">>`](#widget---reenablebytag-tagname), [`<<REDisableByTag "TagName">>`](#widget---redisablebytag-tagname)

### PassageMetadata - `type`

The `type` key can have `"embedded"` or `"goto"` string value and is used to declare how events show.

- Events with `type: "embedded",` will be embade into the passage [`<<RE [[PassageName]]>>`](#widget---re-passagename) or via [`<<REGroup "GroupName">>`](#widget---regroup-groupname) (Example: [Quick start - Step 1 - Embedded events (type: "embedded")](./QuickStart.md#step-1---embedded-events-type-embedded))
- Events with `type: "goto",` will redirect to event passage (Example: [Quick start - Step 2 - Interrupting events (`type: "goto"`))](./QuickStart.md#step-2---interrupting-events-type-goto))

### PassageMetadata - `threshold`

The `threshold` key can have an integer or string value and is defined as the percentage probability that an event called via [`<<RE [[PassageName]]>>`](#widget---re-passagename) will be fired

- Events with **integer** `threshold` value will be called with the probability specified in the value
  - Example: `threshold: 30,` means that the event will be called with a 30 percent chance
- Events with **string** `threshold` value will be processed as a Twine script and called with the probability returned as a Twine script result
  - Example 1: ```threshold: `$currentDayTime === "Morning" ? 50 : 20`,``` means that the event will be called with a 50 percent chance when variable `$currentDayTime` is equal `"Morning"`, and percent chance 20 percent chance in all other cases
  - Example 2: ```threshold: `$myVar + 30`,```, if `$myVar` equal 20 then the event will be called with a 50 percent chance

> [!NOTE]
> Widget [`<<REGroup "GroupName">>`](#widget---regroup-groupname) ignores `threshold` value. It uses group `threshold` instead of event `threshold`
> Example: `<<REGroup "GroupName" 50>>` will be called with a 50 percent probability, regardless of what `threshold` value was specified in each event that is in the group

### PassageMetadata - `filter`

The `filter` key has a **string** Twine script value and checks that the event may be fired or skipped.

- If **true** was returned after executing the Twine script from the `filter` field, the event may be fired.
- If return **false**, then event will be skipped.

Examples:

- Example 1: ```filter: `true`,``` - will always return true as a result
- Example 2: ```filter: `$playerLevel > 5`,``` - will return true if variable `$playerLevel` greater than 5
- Example 3: ```filter: `$playerLevel > 5 or $playerMoney > 100`,``` - will return true if variable `$playerLevel` greater than 5 or variable `$playerMoney` greater than 100

> [!NOTE]
> You can write a multiline filter if necessary, but use the backticks for that!
> Use backticks ``` ` ```, but not `'` or `"`
> [!NOTE]
> In some cases when a filter is complex, a good idea is to add comments
> [!NOTE]
> Some logic may be moved to the JS functions and used in the filters

Example of complex multiline filter with JS functions and comments:

```json
    ...
    filter: `
        ($gameStage === 2 and $playerLevel > 5) or /* comment to main filter */
        myFunction($playerLevel, $someOption) > 10 or /* comment to main filter */
        $isDebugEnabled === true /* this is for debug */
    `,
```

### PassageMetadata - `tags`

The `tags` key has an **array of strings** value. Also, the string may contain a Twine script.
Tags used in [`limitationStrategy`](#passagemetadata---limitationstrategy) and in widgets [`<<REEnableByTag "TagName">>`](#widget---reenablebytag-tagname), [`<<REDisableByTag "TagName">>`](#widget---redisablebytag-tagname)

Examples:

- Example 1: `tags: ["Kitchen", "Weekly"],` - contain an array of strings `"Kitchen"` and `"Weekly"`
- Example 2: `tags: ["Kitchen", "$currentDayTime"],` - contains array with string `"Kitchen"` and Twine script with variable `$currentDayTime`, this variable will convert to the string value during [`limitationStrategy`](#passagemetadata---limitationstrategy) check

### PassageMetadata - `groups`

TBD

### PassageMetadata - `limitationStrategy`

TBD

## Sugarcube widgets

### Widget - `<<RE [[PassageName]]>>`

TBD

### Widget - `<<REGroup "GroupName">>`

TBD

### Widget - `<<REEnable [[PassageName]]>>`

TBD
Useful for enabling single event in one-time events

### Widget - `<<REDisable [[PassageName]]>>`

TBD
Useful for disabling single event in one-time events

### Widget - `<<REEnableByTag "TagName">>`

TBD
Useful for enabling events during a plot twist.

### Widget - `<<REDisableByTag "TagName">>`

TBD
Useful for disabling events during a plot twist.
