import shortid from 'shortid'
import { Request, Response } from 'express'
import { URLModel } from '../database/model/URL'

export class URLController {
  public async shorten(req: Request, res: Response): Promise<void> {
    const { url } = req.body
    const exists = await URLModel.findOne({ url }, '-__v -_id')
    if (exists) {
      res.json(exists)
      return
    }

    const hash = shortid.generate()
    const shortURL = `${process.env.API_URL}/${hash}`
    const newURL = await URLModel.create({ url, shortURL, hash })
    res.json(newURL)
  }

  public async redirect(req: Request, res: Response): Promise<void> {
    const { hash } = req.params
    const exists = await URLModel.findOne({ hash })
    if (exists) {
      res.redirect(exists.url)
      return
    }

    res.status(404).json({ error: 'URL not found' })
  }
}
